
## 小程序构建约定（重要）
- 小程序由 `tools/build-miniprogram.js` 生成：chapters/*.html → miniprogram/packages/*，题库源为 `data/quiz-bank.json`，页面模板在 `tools/mp-templates/`
- **直接改 miniprogram/ 下的生成物会被下次构建覆盖**——改内容要改源头（chapters/*.html、quiz-bank.json、mp-templates/）后重跑构建（需 NODE_PATH 指向 workspace node_modules 加载 cheerio）
- quiz-bank 的 key（ch00~ch27）与章节显示序号不一致，构建脚本中 QUIZ_KEY_BY_SLUG 为显式映射，勿删
- 付费解锁框架在 miniprogram/utils/pay.js，开关 PAY_ENABLED=false 时全免费；真实支付需服务端实现 ORDER_API/VERIFY_API
- 上传流水线：ci/upload.js（miniprogram-ci），需用户提供代码上传密钥 ci/private.key 后才能上传
- 构建脚本转换器为递归渲染（renderFlow/renderContainer），容器内表格/代码/问答均可转换；新容器类型在 renderContainer 加分支，勿回退为「拍平文本」
- rich-text 白名单限制：禁用 view/img本地路径/id；代码块多语言只保留一个 pane（active 或首个），是有意设计
- 校验内容完整性用分句+中段探针法（/tmp/coverage2.py 思路）：代码多语言版与动画文案会造成匹配假象

## 模拟面试（2026-09 新增）
- 面试官池 7 人 4 风格（sharp/gentle/boss/steady）在 miniprogram/utils/interview.js；pickByStyle(styleId, seed) 按风格选人
- 大厂真题场：quiz-bank.json 的 bytedance/meituan/jd 三库（各10题），构建脚本 BOSS_QUIZZES 注册为 boss_* 场次，isBoss=true 常驻解锁
- 题库页有风格选择卡，runner 接受 ?style= 参数；改面试官/风格相关内容要改 interview.js 与 mp-templates/quiz/runner.js 后重跑构建
