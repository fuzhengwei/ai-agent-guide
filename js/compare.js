/* ========================================
   AI Agent Guide - 对比面板渲染工具
   左右对比式内容展示（Demo级 vs 企业级等）
   ======================================== */

const Compare = {
  /**
   * 渲染对比面板到指定容器
   * @param {string} containerId - 容器元素 ID
   * @param {object} config - 配置 {title, leftLabel, leftContent, rightLabel, rightContent}
   */
  render(containerId, config) {
    const container = document.getElementById(containerId);
    // 仅在容器存在于当前章节内容区域时渲染
    const contentBody = document.getElementById('contentBody');
    if (!container || !contentBody || !contentBody.contains(container)) {
      // 静默跳过：章节已切换，该容器不再属于当前页面
      return;
    }

    const { title, leftLabel, leftContent, rightLabel, rightContent } = config;

    // 格式化内容：将 \n 转换为 HTML 行
    const formatContent = (text) => {
      return text
        .split('\n')
        .map(line => {
          // 加粗 ▸ 开头的行
          if (line.startsWith('▸')) {
            return `<div class="compare-item">${line}</div>`;
          }
          // 加粗 → 开头的行（结论行）
          if (line.startsWith('→')) {
            return `<div class="compare-conclusion">${line}</div>`;
          }
          // 空行
          if (!line.trim()) {
            return '<div class="compare-spacer"></div>';
          }
          return `<div>${line}</div>`;
        })
        .join('');
    };

    const html = `
      <div class="compare-panel">
        ${title ? `<h3 class="compare-title">${title}</h3>` : ''}
        <div class="compare-columns">
          <div class="compare-column compare-left">
            <div class="compare-header">${leftLabel || '左侧'}</div>
            <div class="compare-body">${formatContent(leftContent || '')}</div>
          </div>
          <div class="compare-divider">
            <span class="compare-vs">VS</span>
          </div>
          <div class="compare-column compare-right">
            <div class="compare-header">${rightLabel || '右侧'}</div>
            <div class="compare-body">${formatContent(rightContent || '')}</div>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    container.classList.add('compare-rendered');
  }
};
