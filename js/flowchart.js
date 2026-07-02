/* ========================================
   AI Agent Guide - 流程图渲染引擎
   自研轻量SVG流程图系统
   ======================================== */

const FlowChart = {
  /**
   * 渲染流程图
   * @param {string} containerId - 容器元素ID
   * @param {object} config - 配置 {nodes, edges, animate, direction}
   */
  render(containerId, config) {
    const container = document.getElementById(containerId);
    console.log('[FlowChart] render called:', containerId, 'container:', container);
    if (!container) {
      console.error('[FlowChart] Container not found:', containerId);
      return;
    }

    const { nodes, edges, animate = false, direction = 'TB' } = config;
    console.log('[FlowChart] config:', { nodes: nodes.length, edges: edges.length, animate, direction });
    
    // 计算节点位置
    const positioned = this.layout(nodes, edges, direction);
    console.log('[FlowChart] positioned nodes:', Object.keys(positioned));
    
    // 创建SVG
    const svg = this.createSVG(positioned, edges, direction);
    console.log('[FlowChart] SVG created:', svg);
    
    // 插入容器
    container.innerHTML = '';
    container.appendChild(svg);
    console.log('[FlowChart] SVG appended to container');
    
    // 动画
    if (animate) {
      this.animateFlow(svg, positioned, edges);
    }
    
    return svg;
  },

  /**
   * 布局算法 - 简单的层次布局
   */
  layout(nodes, edges, direction) {
    // 找出起点节点：回边（dashed）不计入入度
    const inDegree = {};
    nodes.forEach(n => { inDegree[n.id] = 0; });
    edges.forEach(e => { 
      // dashed 边代表回边/循环边，不计入入度
      if (!e.dashed) {
        inDegree[e.to] = (inDegree[e.to] || 0) + 1;
      }
    });
    
    // 如果所有节点都有入度（纯循环图），取第一个节点为起点
    const startNodes = nodes.filter(n => inDegree[n.id] === 0);
    if (startNodes.length === 0) {
      startNodes.push(nodes[0]);
    }
    
    const visited = new Set();
    const levels = {};
    
    // BFS分层
    let queue = startNodes.map(n => ({ id: n.id, level: 0 }));
    while (queue.length) {
      const { id, level } = queue.shift();
      if (visited.has(id)) continue;
      visited.add(id);
      
      levels[id] = Math.max(levels[id] || 0, level);
      
      edges.filter(e => e.from === id).forEach(e => {
        // 回边不参与BFS（避免循环导致level计算错误）
        if (!visited.has(e.to) && !e.dashed) {
          queue.push({ id: e.to, level: level + 1 });
        }
      });
    }
    
    // 按层分组
    const maxLevel = Math.max(...Object.values(levels), 0);
    const levelGroups = {};
    for (let i = 0; i <= maxLevel; i++) {
      levelGroups[i] = [];
    }
    nodes.forEach(n => {
      const lvl = levels[n.id] !== undefined ? levels[n.id] : 0;
      levelGroups[lvl].push(n);
    });
    
    // 计算坐标
    const nodeWidth = 140;
    const nodeHeight = 48;
    const hGap = 60;
    const vGap = 80;
    const padding = 30;
    
    const positioned = {};
    Object.keys(levelGroups).forEach(lvl => {
      const group = levelGroups[lvl];
      const totalWidth = group.length * nodeWidth + (group.length - 1) * hGap;
      const startX = padding;
      
      group.forEach((node, i) => {
        positioned[node.id] = {
          ...node,
          x: startX + i * (nodeWidth + hGap) + (totalWidth < 400 ? (400 - totalWidth) / 2 : 0),
          y: padding + parseInt(lvl) * (nodeHeight + vGap),
          width: nodeWidth,
          height: nodeHeight
        };
      });
    });
    
    return positioned;
  },

  /**
   * 创建SVG元素
   */
  createSVG(nodes, edges, direction) {
    const nodeArr = Object.values(nodes);
    // 检查是否有回边需要额外右侧空间
    const hasBackEdge = edges.some(e => e.dashed);
    const extraWidth = hasBackEdge ? 100 : 30; // 回边弧线额外需要约100px
    const maxX = Math.max(...nodeArr.map(n => n.x + n.width)) + extraWidth;
    const maxY = Math.max(...nodeArr.map(n => n.y + n.height)) + 30;
    
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", `0 0 ${maxX} ${maxY}`);
    svg.setAttribute("class", "flowchart-svg");
    
    // 定义箭头
    const defs = document.createElementNS(svgNS, "defs");
    defs.innerHTML = `
      <marker id="arrow-default" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <path d="M0,0 L8,3 L0,6 Z" fill="currentColor" opacity="0.4"/>
      </marker>
      <marker id="arrow-active" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <path d="M0,0 L8,3 L0,6 Z" fill="#d4a574"/>
      </marker>
    `;
    svg.appendChild(defs);
    
    // 绘制边
    edges.forEach((edge, i) => {
      const fromNode = nodes[edge.from];
      const toNode = nodes[edge.to];
      if (!fromNode || !toNode) return;
      
      const fromX = fromNode.x + fromNode.width / 2;
      const fromY = fromNode.y + fromNode.height;
      const toX = toNode.x + toNode.width / 2;
      const toY = toNode.y;
      
      const path = document.createElementNS(svgNS, "path");
      const midY = (fromY + toY) / 2;
      
      // 回边（dashed且从下到上）需要特殊路径：弧形绕到侧面
      const isBackEdge = edge.dashed && fromY > toY;
      
      if (isBackEdge) {
        // 回边：从节点底部出发，弧形绕到右侧再连到目标节点左侧
        const offset = 80; // 向右偏移量
        const fromRightX = fromX + fromNode.width / 2 + offset;
        const toRightX = toX + toNode.width / 2 + offset;
        const bottomY = fromY + 20;
        const topY = toY + toNode.height / 2;
        path.setAttribute("d", `M${fromX},${fromY} L${fromRightX},${bottomY} C${fromRightX},${midY} ${toRightX},${midY} ${toRightX},${topY} L${toX},${toY + toNode.height}`);
      } else if (fromX === toX) {
        path.setAttribute("d", `M${fromX},${fromY} L${toX},${toY}`);
      } else {
        path.setAttribute("d", `M${fromX},${fromY} C${fromX},${midY} ${toX},${midY} ${toX},${toY}`);
      }
      
      path.setAttribute("class", `edge ${edge.dashed ? 'dashed' : ''}`);
      path.setAttribute("data-from", edge.from);
      path.setAttribute("data-to", edge.to);
      path.setAttribute("marker-end", "url(#arrow-default)");
      path.style.color = 'var(--color-border-dark)';
      
      svg.appendChild(path);
      
      // 边标签
      if (edge.label) {
        const label = document.createElementNS(svgNS, "text");
        if (isBackEdge) {
          // 回边标签放在弧线右侧
          const labelX = Math.max(fromX, toX) + fromNode.width / 2 + 80;
          label.setAttribute("x", labelX);
          label.setAttribute("y", midY);
          label.setAttribute("text-anchor", "start");
        } else {
          label.setAttribute("x", (fromX + toX) / 2);
          label.setAttribute("y", midY - 4);
        }
        label.setAttribute("class", "edge-label");
        label.textContent = edge.label;
        svg.appendChild(label);
      }
    });
    
    // 绘制节点
    nodeArr.forEach(node => {
      const g = document.createElementNS(svgNS, "g");
      g.setAttribute("class", `node node-${node.type || 'process'}`);
      g.setAttribute("data-id", node.id);
      
      const rect = document.createElementNS(svgNS, "rect");
      rect.setAttribute("x", node.x);
      rect.setAttribute("y", node.y);
      rect.setAttribute("width", node.width);
      rect.setAttribute("height", node.height);
      
      // 节点类型样式
      if (node.type === 'start') {
        rect.setAttribute("rx", "24");
        rect.style.fill = "rgba(91, 140, 90, 0.1)";
        rect.style.stroke = "var(--color-success)";
      } else if (node.type === 'end') {
        rect.setAttribute("rx", "24");
        rect.style.fill = "rgba(184, 84, 80, 0.1)";
        rect.style.stroke = "var(--color-error)";
      } else if (node.type === 'decision') {
        // 菱形用旋转矩形近似
        rect.setAttribute("rx", "4");
        rect.style.fill = "rgba(196, 148, 92, 0.1)";
        rect.style.stroke = "var(--color-warning)";
      } else if (node.type === 'tool') {
        rect.setAttribute("rx", "4");
        rect.style.fill = "rgba(92, 138, 181, 0.1)";
        rect.style.stroke = "var(--color-info)";
      } else {
        rect.setAttribute("rx", "8");
      }
      
      g.appendChild(rect);
      
      const text = document.createElementNS(svgNS, "text");
      text.setAttribute("x", node.x + node.width / 2);
      text.setAttribute("y", node.y + node.height / 2);
      text.textContent = node.label;
      g.appendChild(text);
      
      svg.appendChild(g);
    });
    
    return svg;
  },

  /**
   * 动画：逐步高亮节点和边
   */
  animateFlow(svg, nodes, edges) {
    const allNodes = svg.querySelectorAll('.node');
    const allEdges = svg.querySelectorAll('.edge');
    const allLabels = svg.querySelectorAll('.edge-label');
    
    // 全部暗淡
    allNodes.forEach(n => { n.style.opacity = '0.3'; });
    allEdges.forEach(e => { e.style.opacity = '0.2'; });
    allLabels.forEach(l => { l.style.opacity = '0.2'; });
    
    let step = 0;
    const nodeOrder = Object.values(nodes).sort((a, b) => a.y - b.y);
    
    const interval = setInterval(() => {
      if (step >= nodeOrder.length) {
        clearInterval(interval);
        // 全部恢复
        allNodes.forEach(n => { n.style.opacity = '1'; });
        allEdges.forEach(e => { e.style.opacity = '1'; });
        allLabels.forEach(l => { l.style.opacity = '1'; });
        return;
      }
      
      const node = nodeOrder[step];
      const nodeEl = svg.querySelector(`.node[data-id="${node.id}"]`);
      if (nodeEl) {
        nodeEl.style.opacity = '1';
        nodeEl.classList.add('highlight');
        setTimeout(() => nodeEl.classList.remove('highlight'), 600);
      }
      
      // 高亮相关边
      edges.forEach(edge => {
        if (edge.from === node.id || edge.to === node.id) {
          const edgeEl = svg.querySelector(`.edge[data-from="${edge.from}"][data-to="${edge.to}"]`);
          if (edgeEl) {
            edgeEl.style.opacity = '1';
            edgeEl.classList.add('active');
          }
        }
      });
      
      step++;
    }, 800);
  },

  /**
   * 逐步展示动画（配合步骤控制）
   */
  stepAnimate(svgId, stepIndex) {
    const svg = document.getElementById(svgId);
    if (!svg) return;
    
    const nodes = svg.querySelectorAll('.node');
    const edges = svg.querySelectorAll('.edge');
    
    nodes.forEach((n, i) => {
      if (i <= stepIndex) {
        n.style.opacity = '1';
        if (i === stepIndex) {
          n.classList.add('active');
          setTimeout(() => n.classList.remove('active'), 1000);
        }
      } else {
        n.style.opacity = '0.3';
      }
    });
    
    edges.forEach((e, i) => {
      if (i < stepIndex) {
        e.style.opacity = '1';
      } else {
        e.style.opacity = '0.2';
      }
    });
  }
};

// 暴露到全局
window.FlowChart = FlowChart;
