/**
 * ToyAgent 场景元数据（与后端 web/js/data.js 同源）
 * 每个场景 = 后端一个接口类 + 一段执行轨迹
 * tag: 标注受限场景 —— 小程序内只能"看轨迹"，动手改代码请去 web 版
 */
const SCENARIOS = [
  { id: 'step01', num: '01', group: '基础内核', title: '对话智能体', subtitle: 'chat(input)：智能体的最小 MVP', samples: ['你好，介绍一下你自己', '什么是智能体？', '今天心情不太好'] },
  { id: 'step02', num: '02', group: '基础内核', title: '提示词工程', subtitle: '给模型一份角色说明书', samples: ['用一句话解释什么是 Agent', '介绍一下 Function Calling', '帮我类比一下记忆系统'] },
  { id: 'step03', num: '03', group: '基础内核', title: 'ReAct 智能体', subtitle: '思考-行动-观察循环', samples: ['北京今天天气怎么样？', '上海天气如何，适合出行吗', '帮我算一下 12*8'] },
  { id: 'step04', num: '04', group: '基础内核', title: '工具调用', subtitle: 'Function Calling：给模型装上手脚', samples: ['查一下广州的天气', '计算 1024/8', '你是谁？'] },
  { id: 'step05', num: '05', group: '记忆与知识', title: '记忆系统', subtitle: '多轮记忆 + 上下文压缩', samples: ['我叫小傅哥', '我叫什么名字？', '帮我把我们的对话压缩总结一下'] },
  { id: 'step06', num: '06', group: '记忆与知识', title: '意图路由', subtitle: '先识别意图，再决策走向', samples: ['深圳天气怎么样', '帮我算 99+1', '给我讲个笑话'] },
  { id: 'step07', num: '07', group: '记忆与知识', title: 'RAG 检索增强', subtitle: '戴着资料说话，缓解幻觉', samples: ['ToyAgent 是什么项目？', 'MCP 的核心方法有哪些？', '量子力学的泡利不相容原理是什么？'] },
  { id: 'step08', num: '08', group: '记忆与知识', title: 'LLM-Wiki 知识编译', subtitle: '知识编译一次、持久维护，而非每次从头检索', samples: ['项目用什么代码规范？', '项目怎么部署？', '编译：发布流程：每周三灰度，周五全量上线', '发布流程是什么？'] },
  { id: 'step09', num: '09', group: '工具的进化', title: 'MCP 协议', subtitle: '工具的标准化接口', samples: ['杭州现在几点？天气如何', '查一下北京的天气', 'MCP 是什么协议？'] },
  { id: 'step10', num: '10', group: '工具的进化', title: '技能编排', subtitle: 'Skills：工具的组合与复用 L0/L1/L2', samples: ['帮我做一份杭州旅行攻略', '播报一下上海天气', '聊聊你最喜欢的书'] },
  { id: 'step11', num: '11', group: '工具的进化', title: '工具注册表', subtitle: 'ToolDefinition 协议：注册、发现、热注销', samples: ['查看工具清单', '查一下上海的天气', '算一下 128*8', '现在几点了？', '卸载：get_time', '再看看工具清单'] },
  { id: 'step12', num: '12', group: '协作与派遣', title: '多智能体协作', subtitle: '规划-研究-写作-审查流水线', samples: ['写一段 100 字的智能体科普短文', '调研一下 2026 年 Agent 趋势并成文'] },
  { id: 'step13', num: '13', group: '协作与派遣', title: '子代理', subtitle: 'spawn 全新上下文 / fork 继承上下文', samples: ['记住：我最喜欢紫色', 'fork 一个子代理，让它写一句贺词', '派个研究员调研 Agent 趋势'] },
  { id: 'step14', num: '14', group: '协作与派遣', title: 'A2A 协作', subtitle: 'Agent Card 名片发现 + task_id 信封', samples: ['发现一下附近的代理', '让翻译代理把「你好，智能体」翻译成英文', '问问天气代理明天适合户外运动吗'] },
  { id: 'step15', num: '15', group: '运行时与工程化', title: 'Loop 运行时', subtitle: '守卫 + 保险丝：模型聪明，运行时可靠', samples: ['北京天气怎么样？', '帮我 hack 别人的密码', '用超长的输入测试守卫'] },
  { id: 'step16', num: '16', group: '运行时与工程化', title: '工作流状态机', subtitle: 'LangGraph 思想：节点 + 条件边 + 状态', samples: ['查一下成都天气', '帮我算 25*4', 'RAG 是什么？'] },
  { id: 'step17', num: '17', group: '运行时与工程化', title: 'ReAct 运行时', subtitle: 'turn/step 两级循环 + 上下文裁剪', samples: ['北京天气怎么样？', '帮我算 36*12', '多聊几轮，看上下文裁剪'] },
  { id: 'step18', num: '18', group: '运行时与工程化', title: '全流程智能体', subtitle: '守卫+记忆+ReAct+工具+保险丝 一条链路', samples: ['我叫小傅哥，查一下北京天气再帮我算 26*4', '查下上海天气', '我叫什么名字？', '帮我 hack 别人的密码'] },
  { id: 'step19', num: '19', group: '人机协同与安全', title: '人工介入', subtitle: '提问挂起 → 人工答复续跑', samples: ['帮我订一张去北京的机票', '从上海出发', '查一下杭州天气'] },
  { id: 'step20', num: '20', group: '人机协同与安全', title: '审批门禁', subtitle: '高危操作先过人：批准 / 拒绝 / 批准并记住', samples: ['给团队发一封周报邮件', '批准并记住', '再发一封给老板', '拒绝', '查一下北京天气'] },
  { id: 'step21', num: '21', group: '人机协同与安全', title: '沙箱纵深防御', subtitle: '策略 → 黑名单 → 边界 → 规范化，四层拦截', samples: ['执行：ls sandbox', '执行：rm -rf /', '执行：cat /etc/passwd', '沙箱是什么？'] },
  { id: 'step22', num: '22', group: '人机协同与安全', title: '事件溯源', subtitle: '会话即日志：JSONL 事件流 + 回放重建', samples: ['我叫小傅哥', '我叫什么名字？', '再聊两句', '看看日志里有什么'] },
  { id: 'step23', num: '23', group: '扩展与形态', title: '插件机制', subtitle: 'AgentPlugin 契约 + 隔离 ClassLoader', samples: ['安装插件', '查看工具清单', '掷一次硬币', '卸载插件', '再看看工具清单'], limited: true },
  { id: 'step24', num: '24', group: '扩展与形态', title: 'Hooks 钩子', subtitle: 'before 拦截 / after 脱敏：挂钩即生效', samples: ['查询：张三', '发送：给 13812345678 发 密码是123456', '钩子：关', '查询：张三', '钩子：开', '审计日志'] },
  { id: 'step25', num: '25', group: '扩展与形态', title: 'CLI 智能体', subtitle: '终端 REPL + 沙箱执行器', samples: ['运行：ls', '运行：cat hello.txt', '列出工作区文件', '现在几点了'], limited: true },
  { id: 'step26', num: '26', group: '扩展与形态', title: '定时工具', subtitle: '一次性/循环调度：后台执行，结果可回看', samples: ['定时：5秒 提醒我喝水', '任务列表', '循环：每10秒 报一次时', '完成了什么'] }
];

const GROUPS = ['基础内核', '记忆与知识', '工具的进化', '协作与派遣', '运行时与工程化', '人机协同与安全', '扩展与形态'];

/** 按组聚合，供列表页渲染 */
function grouped() {
  return GROUPS.map(g => ({ name: g, list: SCENARIOS.filter(s => s.group === g) })).filter(g => g.list.length);
}

module.exports = { SCENARIOS, GROUPS, grouped };
