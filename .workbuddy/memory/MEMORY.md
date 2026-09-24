
## 网站云服务（2026-09-24 接入）
- WorkBuddy 云服务 appId `wbapp_62qsE5HMRFHmZdl8SnVl74`，endpoint `https://ai-agent-guide-66900.app.workbuddy.host`；SDK 走 CDN `@tencent-ai/workbuddy-cloud-sdk@dev`
- 前端模块：`js/notes.js`（UserNotes：邮箱登录/划线/收藏/笔记面板，云表 user_notes）、`js/leaderboard.js`（排行榜，云表 user_profiles/exam_records + RPC get_leaderboard）；两者共享一个 cloud 实例
- 排行榜只经 SECURITY DEFINER 函数返回脱敏昵称，表本身禁止跨人 SELECT；数据访问集中在 UserNotes/Leaderboard 模块，将来迁移自建后端只换这层
- ⚠️ 登录/同步只在已发布域名可用（Origin 校验）；发布用 workbuddy_sites_deploy 并复用 appId。用户说先这样跑，量大了再自建
- ⚠️ 云服务资源点用尽数据只保留 15 天，需定期导出 user_notes/user_profiles/exam_records 备份

## 小程序构建约定（重要）
- 小程序由 `tools/build-miniprogram.js` 生成：chapters/*.html → miniprogram/packages/*，题库源为 `data/quiz-bank.json`，页面模板在 `tools/mp-templates/`
- **直接改 miniprogram/ 下的生成物会被下次构建覆盖**——改内容要改源头（chapters/*.html、quiz-bank.json、mp-templates/）后重跑构建（需 NODE_PATH 指向 workspace node_modules 加载 cheerio）
- quiz-bank 的 key（ch00~ch27）与章节显示序号不一致，构建脚本中 QUIZ_KEY_BY_SLUG 为显式映射，勿删
- 付费解锁框架在 miniprogram/utils/pay.js，开关 PAY_ENABLED=false 时全免费；真实支付需服务端实现 ORDER_API/VERIFY_API
- 上传流水线：ci/upload.js（miniprogram-ci），需用户提供代码上传密钥 ci/private.key 后才能上传
- 构建脚本转换器为递归渲染（renderFlow/renderContainer），容器内表格/代码/问答均可转换；新容器类型在 renderContainer 加分支，勿回退为「拍平文本」
- rich-text 白名单限制：禁用 view/img本地路径/id；代码块多语言只保留一个 pane（active 或首个），是有意设计
- 校验内容完整性用分句+中段探针法（/tmp/coverage2.py 思路）：代码多语言版与动画文案会造成匹配假象
- 阅读体验（2026-09-24 晚起）：**正文渲染已从 rich-text 改为节点树**——chapter data 是 `nodes + ttsSegs + toc`（不再有 html 字段），reader.wxml 用 wx:for/递归 block 渲染 nd-* 节点；代码块/表格是独立 scroll-view 横滑；h2/h3 锚点是真实 view 的 id="h-N"，目录点击 createSelectorQuery 定位。tts 序号由构建期 assignTts/flattenTts 分配。⚠️ 不要回退 rich-text（它会拦截整页竖滑、CSS 变量穿不进内部节点、丢弃节点 id）。阅读位置存 store（dsh_read_pos/dsh_last_chapter），首页 onShow 弹「继续上次阅读」

## 最高优先级约定（2026-09-24 用户明确）
- 所有提问默认都是要做「小程序版本」，本助手的职责就是小程序的开发——改动落在 miniprogram/ 及其构建源头（chapters/*.html、data/quiz-bank.json、tools/mp-templates/），不要去做网页端
- 网页端的同类功能（字号/朗读/进度）也要同步到小程序端，用小程序 API 实现

## 阅读工具（2026-09-24）
- 网页端：`js/reader.js` + `js/progress-plus.js`；小程序端：`tools/mp-templates/reader/*` + `miniprogram/utils/tts.js`
- **小程序语音朗读用云函数 TTS 方案**：`cloudfunctions/tts` 调腾讯云 TTS（wechatsi 插件已下架不可用）；部署需在云开发控制台上传部署 + 配置 TENCENT_SECRET_ID/TENCENT_SECRET_KEY 环境变量
- 朗读段落由构建期 assignTts 分配序号并产出 ttsSegs 数组，reader.js 直接使用（不再正则解析 HTML）

## 模拟面试（2026-09 新增）
- 面试官池 7 人 4 风格（sharp/gentle/boss/steady）在 miniprogram/utils/interview.js；pickByStyle(styleId, seed) 按风格选人
- 大厂真题场：quiz-bank.json 的 bytedance/meituan/jd 三库（各10题），构建脚本 BOSS_QUIZZES 注册为 boss_* 场次，isBoss=true 常驻解锁
- 题库页有风格选择卡，runner 接受 ?style= 参数；改面试官/风格相关内容要改 interview.js 与 mp-templates/quiz/runner.js 后重跑构建
