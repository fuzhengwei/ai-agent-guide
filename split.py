import re

with open('chapters/ch00-fundamentals.html', 'r', encoding='utf-8') as f:
    content = f.read()

split_idx = content.find('<!-- ===== 0.4 Token ===== -->')
summary_idx = content.find('<!-- ===== 八股总结 ===== -->')

ch1_body = content[split_idx:summary_idx]
ch1_body = ch1_body.replace('0.4 Token', '1.1 Token')
ch1_body = ch1_body.replace('0.5 Prompt', '1.2 Prompt')
ch1_body = ch1_body.replace('0.6 Embedding', '1.3 Embedding')
ch1_body = ch1_body.replace('0.7 Function Calling', '1.4 Function Calling')
ch1_body = ch1_body.replace('0.8 开源 vs 闭源 LLM', '1.5 开源 vs 闭源 LLM')
ch1_body = ch1_body.replace('0.9 Agent 核心思维框架', '1.6 Agent 核心思维框架')

ch1_html = """<!-- 第1章：大模型与 Agent 基础概念 -->
<h1 class="chapter-title">第1章 大模型与 Agent 基础概念</h1>
<p class="chapter-subtitle">理解 Token、Prompt、Embedding 与思维框架</p>

""" + ch1_body

with open('chapters/ch01-llm-basics.html', 'w', encoding='utf-8') as f:
    f.write(ch1_html)

ch0_html = content[:split_idx] + content[summary_idx:]
with open('chapters/ch00-fundamentals.html', 'w', encoding='utf-8') as f:
    f.write(ch0_html)
