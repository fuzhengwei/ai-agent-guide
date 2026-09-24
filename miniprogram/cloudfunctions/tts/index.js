// tts：文本转语音（腾讯云 TTS）
// 需要在云函数环境开通「腾讯云 TTS」扩展能力，或在代码中配置 SecretId/SecretKey
// 小程序云开发环境默认可用腾讯云 API（需在云开发控制台授权）
const cloud = require('wx-server-sdk');
const tencentcloud = require('tencentcloud-sdk-nodejs');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const TtsClient = tencentcloud.tts.v20190823.Client;

// 音色映射：小程序端 voice id → 腾讯云 VoiceType
// 完整列表见 https://cloud.tencent.com/document/api/1073/37995
const VOICE_MAP = {
  standard: 101001,  // 智瑜（女声，默认）
  bright:   101002,  // 智聆（女声，清亮）
  deep:     101003,  // 智美（女声，沉稳）
};

// 临时凭证：从云开发环境变量读取（在 cloudbase 控制台 -> 云函数 -> 环境变量 配置）
// TENCENT_SECRET_ID / TENCENT_SECRET_KEY
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

exports.main = async (event) => {
  const text = String(event.text || '').trim().slice(0, 300);
  if (!text) return { ok: false, msg: '文本为空' };

  const voiceId = VOICE_MAP[event.voice] || VOICE_MAP.standard;
  // 语速：小程序端 0.6~1.8 → 腾讯云 -2~2（-2=0.6x, 0=1.0x, 2=2.0x）
  const rate = Math.max(0.6, Math.min(1.8, Number(event.rate) || 1));
  const speed = Math.round((rate - 1) * 5) / 2.5;  // 粗略映射：0.6→-1, 1.0→0, 1.8→1.6
  const volume = 5; // 正常音量 0~10

  let client;
  try {
    client = getClient();
  } catch (e) {
    return { ok: false, msg: 'TTS 服务未配置（请在云函数环境变量配置 TENCENT_SECRET_ID / TENCENT_SECRET_KEY）' };
  }

  try {
    const res = await client.TextToVoice({
      Text: text,
      SessionId: `tts-${Date.now()}`,
      VoiceType: voiceId,
      Codec: 'mp3',
      SampleRate: 16000,
      Speed: Math.max(-2, Math.min(2, Math.round(speed))),
      Volume: volume,
      ModelType: 1,
      PrimaryLanguage: 1,  // 中文
    });
    if (!res.Audio) return { ok: false, msg: '合成结果为空' };
    return {
      ok: true,
      audio: res.Audio,  // base64 编码的 mp3
      format: 'mp3',
    };
  } catch (err) {
    return { ok: false, msg: '合成失败: ' + (err.message || err.code || 'unknown') };
  }
};
