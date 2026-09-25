// tts：文本转语音（腾讯云 TTS）
// 需要在云函数环境配置 TENCENT_SECRET_ID / TENCENT_SECRET_KEY 环境变量
//
// 缓存策略：以 voice+rate+text 的 md5 为 key，
// 合成结果上传到云存储 tts-audio/{hash}.mp3，命中直接返临时 URL，
// 避免重复调腾讯云 TTS API（省钱 + 秒回）。
const cloud = require('wx-server-sdk');
const tencentcloud = require('tencentcloud-sdk-nodejs');
const crypto = require('crypto');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const TtsClient = tencentcloud.tts.v20190823.Client;

// 音色映射：小程序端 voice id → 腾讯云 VoiceType
// 完整列表见 https://cloud.tencent.com/document/api/1073/37995
const VOICE_MAP = {
  // —— 女声 ——
  standard: 101001,  // 智瑜 · 情感女声（默认，清晰自然）
  bright:   101002,  // 智聆 · 通用女声（清亮活泼）
  sweet:    101016,  // 智甜 · 甜美女声（软妹、偏卡通感）
  assistant:101006,  // 智言 · 助手女声（亲切，接近智能助手）
  deep:     101003,  // 智美 · 客服女声（沉稳磁性）
  // —— 男声 ——
  male:     101004,  // 智云 · 通用男声（标准男声）
  reader:   101010,  // 智华 · 通用男声（偏成熟，适合长文阅读）
  // —— 卡通 / 童声 ——
  boy:      101015,  // 智萌 · 男童声（卡通感、活泼）
};

function getClient() {
  const secretId = process.env.TENCENT_SECRET_ID;
  const secretKey = process.env.TENCENT_SECRET_KEY;
  if (!secretId || !secretKey) {
    throw new Error('missing-credentials');
  }
  return new TtsClient({
    credential: { secretId, secretKey },
    region: 'ap-guangzhou',
    profile: { httpProfile: { endpoint: 'tts.tencentcloudapi.com' } },
  });
}

// 语速映射（与前端一致）：0.6~1.8 → 腾讯云 -2~2
function rateToSpeed(rate) {
  const r = Math.max(0.6, Math.min(1.8, Number(rate) || 1));
  const speed = Math.round((r - 1) * 5) / 2.5;
  return Math.max(-2, Math.min(2, Math.round(speed)));
}

// 缓存版本：升级合成模型/想强制旧音频作废时 +1（前端 utils/tts.js 同步改）
const CACHE_VERSION = 'v1';

// 缓存 key：语速按 0.1 粒度归一，避免 1.0 和 1.03 产生两份缓存
function cacheKey(voiceType, rate, text) {
  const r = Math.round((Number(rate) || 1) * 10) / 10;
  return crypto.createHash('md5').update(`${CACHE_VERSION}|${voiceType}|${r}|${text}`).digest('hex');
}

// 云端缓存：tts-audio/{key}.mp3，存在则换临时 URL 返回
async function lookupCache(key) {
  try {
    const envId = process.env.TCB_ENV || process.env.SCF_NAMESPACE || '';
    const fileID = `cloud://${envId}.tts-audio/${key}.mp3`;
    const res = await cloud.getTempFileURL({ fileList: [fileID] });
    const f = (res.fileList || [])[0];
    // status 0 = 成功；文件不存在时 status 非 0
    if (f && f.status === 0 && f.tempFileURL) return f.tempFileURL;
  } catch (e) { /* 未命中 */ }
  return null;
}

exports.main = async (event) => {
  const text = String(event.text || '').trim().slice(0, 300);
  if (!text) return { ok: false, msg: '文本为空' };

  const voiceType = VOICE_MAP[event.voice] || VOICE_MAP.standard;
  const rate = Math.max(0.6, Math.min(1.8, Number(event.rate) || 1));
  const key = cacheKey(voiceType, rate, text);

  // ① 命中云端缓存：直接返临时 URL，不调 TTS
  const hit = await lookupCache(key);
  if (hit) return { ok: true, url: hit, cached: true, format: 'mp3' };

  // ② 未命中：调腾讯云 TTS 合成
  let client;
  try {
    client = getClient();
  } catch (e) {
    return { ok: false, msg: 'TTS 服务未配置（请在云函数环境变量配置 TENCENT_SECRET_ID / TENCENT_SECRET_KEY）' };
  }

  let audioB64;
  try {
    const res = await client.TextToVoice({
      Text: text,
      SessionId: `tts-${Date.now()}`,
      VoiceType: voiceType,
      Codec: 'mp3',
      SampleRate: 16000,
      Speed: rateToSpeed(rate),
      Volume: 5,
      ModelType: 1,
      PrimaryLanguage: 1,
    });
    if (!res.Audio) return { ok: false, msg: '合成结果为空' };
    audioB64 = res.Audio;
  } catch (err) {
    return { ok: false, msg: '合成失败: ' + (err.message || err.code || 'unknown') };
  }

  // ③ 上传到云存储做长期缓存；成功则直接返 URL（下次即命中）
  try {
    const up = await cloud.uploadFile({
      cloudPath: `tts-audio/${key}.mp3`,
      fileContent: Buffer.from(audioB64, 'base64'),
    });
    if (up && up.fileID) {
      const res = await cloud.getTempFileURL({ fileList: [up.fileID] });
      const f = (res.fileList || [])[0];
      if (f && f.status === 0 && f.tempFileURL) {
        return { ok: true, url: f.tempFileURL, cached: false, format: 'mp3' };
      }
    }
  } catch (e) { /* 上传失败，回退 base64 */ }

  return { ok: true, audio: audioB64, cached: false, format: 'mp3' };
};
