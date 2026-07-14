/* ========================================
   AI Agent Guide - 考试系统
   题库加载、答题、判分、错题记录
   ======================================== */

const Quiz = {
  currentQuestions: [],
  currentAnswers: {},
  submitted: false,
  _bankCache: null, // 题库缓存，避免重复 fetch 160KB JSON

  /**
   * 加载题库（带缓存）
   */
  async loadBank(chapterId) {
    try {
      if (!this._bankCache) {
        const response = await fetch('data/quiz-bank.json');
        this._bankCache = await response.json();
      }
      return this._bankCache[chapterId] || [];
    } catch (e) {
      console.warn('题库加载失败，使用内置题目', e);
      return this.getBuiltInQuestions(chapterId);
    }
  },

  /**
   * 渲染考试区域
   */
  render(containerId, questions) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    this.currentQuestions = questions;
    this.currentAnswers = {};
    this.submitted = false;
    
    let html = `
      <div class="quiz-section" id="quizContainer">
        <div class="quiz-header">
          <h3>📝 课后考试</h3>
          <span class="quiz-score" id="quizScore">共 ${questions.length} 题</span>
        </div>
        <div class="quiz-body" id="quizBody">
    `;
    
    questions.forEach((q, i) => {
      // Skip questions without options (open/essay type)
      if (!q.options || !Array.isArray(q.options) || q.options.length === 0) {
        return;
      }
      const isMulti = q.type === 'multiple' || q.type === 'multi';
      const typeLabel = isMulti ? '多选题' : '单选题';
      html += `
        <div class="quiz-question" data-q-index="${i}">
          <div class="q-type">${typeLabel}</div>
          <div class="q-text">${i + 1}. ${q.question}</div>
          <div class="quiz-options">
      `;
      
      q.options.forEach((opt, j) => {
        const letter = String.fromCharCode(65 + j);
        html += `
          <div class="quiz-option" data-q="${i}" data-opt="${j}">
            <span class="option-letter">${letter}</span>
            <span>${opt}</span>
          </div>
        `;
      });
      
      html += `
          </div>
          <div class="quiz-explanation" id="explanation-${i}">
            <strong>解析：</strong>${q.explanation}
          </div>
        </div>
      `;
    });
    
    html += `
        </div>
        <div class="quiz-actions">
          <button class="quiz-btn primary" onclick="Quiz.submit()">提交答案</button>
          <button class="quiz-btn" onclick="Quiz.reset()">重做</button>
        </div>
        <div id="quizResult"></div>
      </div>
    `;
    
    container.innerHTML = html;
    
    // 绑定选项点击
    this.bindOptions();
  },

  /**
   * 绑定选项点击事件
   */
  bindOptions() {
    document.querySelectorAll('.quiz-option').forEach(el => {
      el.addEventListener('click', () => {
        if (this.submitted) return;
        
        const qIndex = parseInt(el.dataset.q);
        const optIndex = parseInt(el.dataset.opt);
        const question = this.currentQuestions[qIndex];
        
        if (question.type === 'single') {
          // 单选：清除同题其他选项
          document.querySelectorAll(`.quiz-option[data-q="${qIndex}"]`).forEach(o => {
            o.classList.remove('selected');
          });
          el.classList.add('selected');
          this.currentAnswers[qIndex] = [optIndex];
        } else {
          // 多选：切换
          el.classList.toggle('selected');
          if (!this.currentAnswers[qIndex]) {
            this.currentAnswers[qIndex] = [];
          }
          const idx = this.currentAnswers[qIndex].indexOf(optIndex);
          if (idx > -1) {
            this.currentAnswers[qIndex].splice(idx, 1);
          } else {
            this.currentAnswers[qIndex].push(optIndex);
          }
        }
      });
    });
  },

  /**
   * 提交答案
   */
  submit() {
    this.submitted = true;
    let correct = 0;
    let wrongQuestions = [];
    
    this.currentQuestions.forEach((q, i) => {
      const userAnswer = this.currentAnswers[i] || [];
      // Normalize answer: handle bare number, letter string, or array
      let correctAnswer = q.answer;
      if (typeof correctAnswer === 'number') correctAnswer = [correctAnswer];
      if (typeof correctAnswer === 'string' && /^[A-D]$/.test(correctAnswer)) correctAnswer = [correctAnswer.charCodeAt(0) - 65];
      if (!Array.isArray(correctAnswer)) correctAnswer = [];
      // Normalize letter answers in arrays (A→0, B→1, C→2, D→3)
      correctAnswer = correctAnswer.map(a => (typeof a === 'string' && /^[A-D]$/.test(a)) ? a.charCodeAt(0) - 65 : a);
      const normalizedUser = userAnswer.map(a => (typeof a === 'string' && /^[A-D]$/.test(a)) ? a.charCodeAt(0) - 65 : a);
      
      const isCorrect = normalizedUser.length === correctAnswer.length &&
        correctAnswer.every(a => normalizedUser.includes(a));
      
      if (isCorrect) {
        correct++;
      } else {
        wrongQuestions.push({
          chapter: q.chapter || 'unknown',
          question: q.question,
          userAnswer: normalizedUser.map(idx => String.fromCharCode(65 + idx)),
          correctAnswer: correctAnswer.map(idx => String.fromCharCode(65 + idx)),
          explanation: q.explanation
        });
      }
      
      // 标记选项
      document.querySelectorAll(`.quiz-option[data-q="${i}"]`).forEach(el => {
        const optIndex = parseInt(el.dataset.opt);
        el.classList.remove('selected');
        
        if (correctAnswer.includes(optIndex)) {
          el.classList.add('correct');
        } else if (normalizedUser.includes(optIndex)) {
          el.classList.add('wrong');
        }
      });
      
      // 显示解析
      const exp = document.getElementById(`explanation-${i}`);
      if (exp) exp.classList.add('show');
    });
    
    // 显示结果
    const total = this.currentQuestions.length;
    const score = Math.round((correct / total) * 100);
    
    const resultEl = document.getElementById('quizResult');
    if (resultEl) {
      let grade = '加油！';
      if (score >= 90) grade = '优秀！🏆';
      else if (score >= 75) grade = '良好 👍';
      else if (score >= 60) grade = '及格';
      
      resultEl.innerHTML = `
        <div class="quiz-result">
          <div class="score-circle">${score}</div>
          <div class="score-label">${grade} 答对 ${correct}/${total} 题</div>
          <button class="quiz-btn" onclick="Quiz.reviewWrong()">查看错题</button>
        </div>
      `;
    }
    
    // 保存成绩到进度
    const chapterId = document.body.dataset.chapter || 'unknown';
    Progress.saveQuizResult(chapterId, { score, correct, total, wrongQuestions });
    
    // 禁用选项点击
    document.querySelectorAll('.quiz-option').forEach(el => {
      el.style.cursor = 'default';
    });
    
    // 隐藏提交按钮
    const submitBtn = document.querySelector('.quiz-btn.primary');
    if (submitBtn) submitBtn.style.display = 'none';
  },

  /**
   * 重做
   */
  reset() {
    this.currentAnswers = {};
    this.submitted = false;
    
    document.querySelectorAll('.quiz-option').forEach(el => {
      el.classList.remove('selected', 'correct', 'wrong');
      el.style.cursor = 'pointer';
    });
    
    document.querySelectorAll('.quiz-explanation').forEach(el => {
      el.classList.remove('show');
    });
    
    const resultEl = document.getElementById('quizResult');
    if (resultEl) resultEl.innerHTML = '';
    
    const submitBtn = document.querySelector('.quiz-btn.primary');
    if (submitBtn) submitBtn.style.display = '';
    
    this.bindOptions();
  },

  /**
   * 查看错题
   */
  reviewWrong() {
    const chapterId = document.body.dataset.chapter || 'unknown';
    const results = Progress.getQuizResults();
    const result = results[chapterId];
    
    if (!result || !result.wrongQuestions.length) {
      alert('没有错题记录！');
      return;
    }
    
    let html = '错题本:\n\n';
    result.wrongQuestions.forEach((wq, i) => {
      html += `${i + 1}. ${wq.question}\n`;
      html += `   你的答案: ${wq.userAnswer.join(', ')}\n`;
      html += `   正确答案: ${wq.correctAnswer.join(', ')}\n`;
      html += `   解析: ${wq.explanation}\n\n`;
    });
    
    alert(html);
  },

  /**
   * 内置题目（当题库文件加载失败时的后备）
   */
  getBuiltInQuestions(chapterId) {
    const bank = {
      ch01: [
        {
          type: 'single',
          question: 'AI Agent 与传统 ChatBot 最核心的区别是什么？',
          options: [
            'A. Agent 使用更大的语言模型',
            'B. Agent 能自主规划、决策和使用工具',
            'C. Agent 只能回答预设问题',
            'D. Agent 不需要自然语言处理'
          ],
          answer: [1],
          explanation: 'AI Agent 的核心区别在于它具备自主规划、决策和工具调用的能力，而不只是被动回答问题。ChatBot 只能根据输入生成文本回复。'
        },
        {
          type: 'multiple',
          question: '以下哪些是 AI Agent 的核心组成部分？（多选）',
          options: [
            'A. LLM（大语言模型）作为大脑',
            'B. 记忆系统（短期+长期）',
            'C. 规划与推理模块',
            'D. 工具调用能力'
          ],
          answer: [0, 1, 2, 3],
          explanation: 'AI Agent 的四大核心模块：LLM（大脑）、记忆（存储）、规划（推理决策）、工具（执行行动）。缺一不可。'
        }
      ]
    };
    return bank[chapterId] || [];
  }
};

window.Quiz = Quiz;
