/* ========================================
   AI Agent Guide - 流程图渲染引擎
   自研轻量SVG流程图系统
   ======================================== */

const FlowChart = {
  // 记录每个容器当前运行的动画 interval，便于重播/清理
  _activeAnimations: {},
  // 保存每个容器的渲染配置，便于点击重播按钮时重新渲染
  _configs: {},

  /**
   * 自动查找页面上带有 data-flowchart 的元素并渲染
   */
  init() {
    const contentBody = document.getElementById('contentBody');
    const containers = document.querySelectorAll('.flowchart-container[data-flowchart]');
    containers.forEach(container => {
      // 仅渲染当前章节内容区域内的流程图容器
      if (contentBody && !contentBody.contains(container)) return;
      if (!container.id) {
        container.id = 'flowchart_' + Math.random().toString(36).substring(2, 9);
      }
      try {
        const config = JSON.parse(container.dataset.flowchart);
        this.render(container.id, config);
      } catch (e) {
        console.warn('[FlowChart] Parse config error for', container.id, e);
      }
    });
  },

  /**
   * 渲染流程图
   * @param {string} containerId - 容器元素ID
   * @param {object} config - 配置 {nodes, edges, animate, direction}
   */
  render(containerId, config) {
    const container = document.getElementById(containerId);
    // 仅在容器存在于当前章节内容区域时渲染，避免切换章节后旧 setTimeout 回调报错
    const contentBody = document.getElementById('contentBody');
    if (!container || !contentBody || !contentBody.contains(container)) {
      // 静默跳过：章节已切换，该容器不再属于当前页面
      return;
    }

    // 渲染前先清理该容器上正在进行的动画
    this._stopAnimation(containerId);

    const { nodes, edges, animate = false, direction = 'TB' } = config;

    // 计算节点位置
    const positioned = this.layout(nodes, edges, direction);

    // 创建SVG
    const svg = this.createSVG(positioned, edges, direction);

    // 插入容器
    container.innerHTML = '';
    container.appendChild(svg);

    // 动画：保存配置以便重播，并添加重播按钮
    if (animate) {
      this._configs[containerId] = config;
      this._addReplayButton(container, containerId);
      this.animateFlow(svg, positioned, edges, containerId);
    }

    return svg;
  },

  /**
   * 添加重播按钮到流程图容器
   */
  _addReplayButton(container, containerId) {
    // 避免重复添加
    if (container.querySelector('.flowchart-replay-btn')) return;
    const btn = document.createElement('button');
    btn.className = 'flowchart-replay-btn';
    btn.title = '重播动画';
    btn.innerHTML = '↺ 重播';
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const config = this._configs[containerId];
      if (config) {
        this.render(containerId, config);
      }
    });
    container.appendChild(btn);
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
    const baseHeight = 44;   // 单行节点的基础高度
    const lineGap = 16;       // 每多一行增加的高度
    const hGap = 50;          // 同层节点水平间距
    const vGap = 50;          // 层间垂直间距
    const padding = 30;
    const minNodeWidth = 130;
    const maxNodeWidth = 220;

    // 估算文字宽度：中文≈14px/字，英文≈7.5px/字符（font-size 13）
    const estimateTextWidth = (text) => {
      let w = 0;
      for (const ch of String(text)) {
        // CJK 字符及全角标点按宽字计算
        w += /[一-鿿＀-￯　-〿：；，。、（）]/.test(ch) ? 14 : 7.5;
      }
      return w;
    };

    // 先计算每个节点的实际尺寸（基于内容）
    const nodeSizes = {};
    nodes.forEach(n => {
      const lines = String(n.label).split('\n');
      const lineCount = lines.length;
      const longestLine = Math.max(...lines.map(l => estimateTextWidth(l)));
      // 节点宽度 = 最长行 + 左右内边距，限制在 [min, max] 之间
      const width = Math.max(minNodeWidth, Math.min(maxNodeWidth, Math.ceil(longestLine) + 28));
      const height = baseHeight + Math.max(0, lineCount - 1) * lineGap;
      nodeSizes[n.id] = { width, height };
    });

    // 判断是否为线性链：每层只有 1 个节点 → 用横向网格布局更紧凑
    const isLinearChain = Object.values(levelGroups).every(g => g.length === 1) && maxLevel >= 3;

    const positioned = {};

    if (isLinearChain) {
      // ===== 线性链：蛇形（boustrophedon）网格布局 =====
      // 按层级顺序排列，每行放 nodesPerRow 个，偶数行从左到右，奇数行从右到左
      // 这样相邻节点总是紧挨着，转折边在同一侧，视觉上像一条蛇
      const orderedNodes = [];
      for (let lvl = 0; lvl <= maxLevel; lvl++) {
        orderedNodes.push(levelGroups[lvl][0]);
      }
      const nodesPerRow = orderedNodes.length <= 4 ? orderedNodes.length : 4;
      const rowH = baseHeight + lineGap * 3 + vGap;

      orderedNodes.forEach((node, idx) => {
        const row = Math.floor(idx / nodesPerRow);
        const colInRow = idx % nodesPerRow;
        // 奇数行反向，形成蛇形
        const col = row % 2 === 0 ? colInRow : (nodesPerRow - 1 - colInRow);
        const size = nodeSizes[node.id];
        positioned[node.id] = {
          ...node,
          x: padding + col * (maxNodeWidth + hGap),
          y: padding + row * rowH,
          width: size.width,
          height: size.height,
          _row: row,
          _col: col,
          _idxInSeq: idx,
          _isLinear: true,
        };
      });
    } else {
      // ===== 分支图：纵向层次布局（原有逻辑） =====
      Object.keys(levelGroups).forEach(lvl => {
        const group = levelGroups[lvl];
        const totalWidth = group.reduce((sum, n) => sum + nodeSizes[n.id].width, 0)
                        + (group.length - 1) * hGap;
        // 居中排列：若总宽不足 400 则居中偏移
        const centerOffset = totalWidth < 400 ? (400 - totalWidth) / 2 : 0;
        let cursorX = padding + centerOffset;

        group.forEach((node) => {
          const size = nodeSizes[node.id];
          positioned[node.id] = {
            ...node,
            x: cursorX,
            y: padding + parseInt(lvl) * (baseHeight + lineGap * 3 + vGap),
            width: size.width,
            height: size.height
          };
          cursorX += size.width + hGap;
        });
      });
    }

    return positioned;
  },

  /**
   * 创建SVG元素
   */
  createSVG(nodes, edges, direction) {
    const nodeArr = Object.values(nodes);
    // 检测回边（按位置判断，不依赖 dashed 标记）：目标在源上方，或同行向左
    const backEdgeInfo = { hasVerticalBack: false, hasSameRowBack: false };
    edges.forEach(e => {
      const f = nodes[e.from], t = nodes[e.to];
      if (!f || !t) return;
      if (t.y < f.y - 2) backEdgeInfo.hasVerticalBack = true;
      if (e.dashed && Math.abs(t.y - f.y) < f.height && t.x < f.x) backEdgeInfo.hasSameRowBack = true;
    });
    // 回边绕右侧需要 ~80px 额外宽度；同行回边下弯需要 ~40px 额外高度
    const extraWidth = backEdgeInfo.hasVerticalBack ? 90 : 25;
    const extraHeight = backEdgeInfo.hasSameRowBack ? 50 : 25;
    const maxX = Math.max(...nodeArr.map(n => n.x + n.width)) + extraWidth;
    const maxY = Math.max(...nodeArr.map(n => n.y + n.height)) + extraHeight;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", `0 0 ${maxX} ${maxY}`);
    svg.setAttribute("class", "flowchart-svg");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    // 设置固有宽高（等于 viewBox 尺寸），配合 CSS max-width:100% 实现按内容自适应：
    // 容器够宽时按原始尺寸显示，容器窄时等比缩小，不会拉伸或滚动
    svg.setAttribute("width", Math.round(maxX));
    svg.setAttribute("height", Math.round(maxY));

    // 定义箭头
    const defs = document.createElementNS(svgNS, "defs");
    defs.innerHTML = `
      <marker id="arrow-default" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <path d="M0,0 L8,3 L0,6 Z" fill="currentColor" opacity="0.4"/>
      </marker>
      <marker id="arrow-active" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <path d="M0,0 L8,3 L0,6 Z" fill="#4f46e5"/>
      </marker>
    `;
    svg.appendChild(defs);

    // 绘制边
    edges.forEach((edge, i) => {
      const fromNode = nodes[edge.from];
      const toNode = nodes[edge.to];
      if (!fromNode || !toNode) return;

      const path = document.createElementNS(svgNS, "path");
      const route = this._computeEdgePath(fromNode, toNode, edge, nodeArr);
      path.setAttribute("d", route.d);
      path.setAttribute("class", `edge ${edge.dashed ? 'dashed' : ''}`);
      path.setAttribute("data-from", edge.from);
      path.setAttribute("data-to", edge.to);
      path.setAttribute("marker-end", "url(#arrow-default)");
      path.style.color = 'var(--color-border-dark)';
      svg.appendChild(path);

      // 边标签：放在路径的"有意义点"上（横段中点或弧线外侧）
      if (edge.label) {
        const label = document.createElementNS(svgNS, "text");
        label.setAttribute("x", route.labelX);
        label.setAttribute("y", route.labelY);
        label.setAttribute("text-anchor", route.labelAnchor || 'middle');
        label.setAttribute("class", "edge-label");
        // 标签加白色底，避免与边线重叠时看不清
        label.setAttribute("paint-order", "stroke");
        label.setAttribute("stroke", "var(--color-surface)");
        label.setAttribute("stroke-width", "3");
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

      // 节点类型样式：用 class 而非 inline style，便于深色主题适配
      const nodeType = node.type || 'process';
      rect.classList.add(`node-rect-${nodeType}`);
      if (nodeType === 'start' || nodeType === 'end') {
        rect.setAttribute("rx", "24");
      } else if (nodeType === 'decision') {
        rect.setAttribute("rx", "4");
      } else if (nodeType === 'tool') {
        rect.setAttribute("rx", "4");
      } else {
        rect.setAttribute("rx", "8");
      }

      g.appendChild(rect);

      // 支持多行文本（label 中的 \n 拆分）
      const lines = String(node.label).split('\n');
      const lineHeight = 16;
      const startY = node.y + node.height / 2 - (lines.length - 1) * lineHeight / 2;
      lines.forEach((line, idx) => {
        const text = document.createElementNS(svgNS, "text");
        text.setAttribute("x", node.x + node.width / 2);
        text.setAttribute("y", startY + idx * lineHeight);
        if (lines.length > 1 && idx === 0) {
          text.setAttribute("font-weight", "600");
        }
        text.textContent = line;
        g.appendChild(text);
      });

      svg.appendChild(g);
    });

    return svg;
  },

  /**
   * 计算边的路径（正交折线为主，回边用弧形绕外侧）
   * 核心原则：走节点之间的空隙，绝不穿过其他节点
   * 返回 { d: pathString, labelX, labelY, labelAnchor }
   */
  _computeEdgePath(from, to, edge, allNodes) {
    const r = 8; // 圆角半径
    const fromCx = from.x + from.width / 2;
    const fromCy = from.y + from.height / 2;
    const toCx = to.x + to.width / 2;
    const toCy = to.y + to.height / 2;

    // ===== 1. 回边：目标在源上方（反馈/回溯），或同行向左且 dashed =====
    const goingUp = to.y < from.y - 2;
    const sameRowLeftBack = edge.dashed &&
      Math.abs(to.y - from.y) < from.height && to.x < from.x;

    if (goingUp || sameRowLeftBack) {
      return this._routeBackEdge(from, to, allNodes);
    }

    // ===== 2. 同行横向连接（蛇形布局内的同行边） =====
    if (Math.abs(to.y - from.y) < from.height * 0.6) {
      return this._routeSameRow(from, to, r, allNodes);
    }

    // ===== 3. 纵向：同列直连 =====
    if (Math.abs(fromCx - toCx) < 3) {
      const fromBx = fromCx;
      const fromBy = from.y + from.height;
      const toTy = to.y;
      return {
        d: `M${fromBx},${fromBy} L${fromCx},${toTy}`,
        labelX: fromCx, labelY: (fromBy + toTy) / 2, labelAnchor: 'middle'
      };
    }

    // ===== 4. 跨行斜向：正交 Z 折线（含障碍物检测） =====
    return this._routeOrthogonal(from, to, r, allNodes);
  },

  /**
   * 正交 Z 折线：源底中点 → 下到行间空隙 → 横向 → 下到目标顶中点
   * 若横段会穿过中间层的节点，则改走右侧外围绕过
   */
  _routeOrthogonal(from, to, r, allNodes) {
    const fromBx = from.x + from.width / 2;
    const fromBy = from.y + from.height;
    const toTx = to.x + to.width / 2;
    const toTy = to.y;
    const gapY = (fromBy + toTy) / 2;
    const goRight = toTx > fromBx;
    const dir = goRight ? 1 : -1;
    const span = Math.abs(toTx - fromBx);

    // 检测三段路径（源下、横段、目标上）是否穿过任何非连接节点
    const lo = Math.min(fromBx, toTx), hi = Math.max(fromBx, toTx);
    const blocked = allNodes.some(n => {
      if (n.id === from.id || n.id === to.id) return false;
      // 段1：源列垂直段 fromBy → gapY
      if (fromBx > n.x + 2 && fromBx < n.x + n.width - 2 &&
          n.y < gapY && n.y + n.height > fromBy) return true;
      // 段2：横段 gapY 高度 lo → hi
      if (n.y < gapY && n.y + n.height > gapY &&
          n.x + n.width > lo && n.x < hi) return true;
      // 段3：目标列垂直段 gapY → toTy
      if (toTx > n.x + 2 && toTx < n.x + n.width - 2 &&
          n.y < toTy && n.y + n.height > gapY) return true;
      return false;
    });

    if (blocked) {
      // 有障碍：绕到右侧（或左侧）外围绕过
      return this._routeAroundSide(from, to, allNodes, fromBy, toTy);
    }

    let d;
    if (span < r * 3) {
      d = `M${fromBx},${fromBy} C${fromBx},${gapY} ${toTx},${gapY} ${toTx},${toTy}`;
    } else {
      d = `M${fromBx},${fromBy} ` +
          `L${fromBx},${gapY - r} ` +
          `Q${fromBx},${gapY} ${fromBx + dir * r},${gapY} ` +
          `L${toTx - dir * r},${gapY} ` +
          `Q${toTx},${gapY} ${toTx},${gapY + r} ` +
          `L${toTx},${toTy}`;
    }
    return { d, labelX: (fromBx + toTx) / 2, labelY: gapY - 5, labelAnchor: 'middle' };
  },

  /**
   * 同行横向连接：从源右侧到目标左侧
   * 若中间有其他节点挡道，则向上弓起绕过
   */
  _routeSameRow(from, to, r, allNodes) {
    const fromCy = from.y + from.height / 2;
    const toCy = to.y + to.height / 2;
    const goRight = (to.x + to.width / 2) > (from.x + from.width / 2);
    const fromSx = goRight ? from.x + from.width : from.x;
    const toEx = goRight ? to.x : to.x + to.width;

    // 检测同行中间是否有节点挡道
    const lo = Math.min(fromSx, toEx), hi = Math.max(fromSx, toEx);
    const blocked = allNodes.some(n =>
      n.id !== from.id && n.id !== to.id &&
      Math.abs(n.y - from.y) < from.height && // 同行
      (n.x + n.width) > lo && n.x < hi
    );

    if (blocked) {
      // 向上弓起绕过障碍
      const bowY = Math.min(from.y, to.y) - 22;
      return {
        d: `M${fromSx},${fromCy} C${fromSx},${bowY} ${toEx},${bowY} ${toEx},${toCy}`,
        labelX: (fromSx + toEx) / 2, labelY: bowY - 4, labelAnchor: 'middle'
      };
    }

    if (Math.abs(fromCy - toCy) < 2) {
      return { d: `M${fromSx},${fromCy} L${toEx},${toCy}`,
               labelX: (fromSx + toEx) / 2, labelY: fromCy - 5, labelAnchor: 'middle' };
    }
    const midX = (fromSx + toEx) / 2;
    return { d: `M${fromSx},${fromCy} C${midX},${fromCy} ${midX},${toCy} ${toEx},${toCy}`,
             labelX: midX, labelY: (fromCy + toCy) / 2, labelAnchor: 'middle' };
  },

  /**
   * 侧绕路由：当前向路径被中间节点挡住时，从源的一侧绕到外侧再折向目标
   * 用于跨多层的前向边（如 level 0 → level 2，中间 level 1 有节点）
   */
  _routeAroundSide(from, to, allNodes, fromBy, toTy) {
    const fromCx = from.x + from.width / 2;
    const toCx = to.x + to.width / 2;
    // 选择从哪一侧绕：目标在右就绕右侧，目标在左绕左侧
    const goRight = toCx >= fromCx;
    let bound;
    if (goRight) {
      bound = 0;
      allNodes.forEach(n => { bound = Math.max(bound, n.x + n.width); });
      bound += 40;
    } else {
      bound = 99999;
      allNodes.forEach(n => { bound = Math.min(bound, n.x); });
      bound -= 40;
    }
    // 从源底部 → 下一点 → 外侧通道 → 目标顶部
    const exitY = fromBy + 14;
    const entryY = toTy - 14;
    const d = `M${fromCx},${fromBy} ` +
              `L${fromCx},${exitY} ` +
              `L${bound},${exitY} ` +
              `L${bound},${entryY} ` +
              `L${toCx},${entryY} ` +
              `L${toCx},${toTy}`;
    return {
      d,
      labelX: goRight ? bound + 5 : bound - 5,
      labelY: (exitY + entryY) / 2,
      labelAnchor: goRight ? 'start' : 'end'
    };
  },

  /**
   * 回边路由：绕到所有节点的外侧（右方），再折回目标
   * 避免穿过中间任何节点
   */
  _routeBackEdge(from, to, allNodes) {
    const fromCx = from.x + from.width / 2;
    const fromBy = from.y + from.height;
    const toCx = to.x + to.width / 2;
    const toTy = to.y;

    // 判断是"同行回边"还是"跨行回边"
    const sameRow = Math.abs(to.y - from.y) < from.height;

    if (sameRow) {
      // 同行回边：从源底部向下绕弧回到目标底部
      const dipY = Math.max(fromBy, to.y + to.height) + 35;
      return {
        d: `M${fromCx},${fromBy} C${fromCx},${dipY} ${toCx},${dipY} ${toCx},${to.y + to.height}`,
        labelX: (fromCx + toCx) / 2, labelY: dipY + 4, labelAnchor: 'middle'
      };
    }

    // 跨行回边：绕到右侧外（超过所有节点的右边界）
    let rightBound = 0;
    allNodes.forEach(n => { rightBound = Math.max(rightBound, n.x + n.width); });
    const rightX = rightBound + 45;

    // 从源底部出发 → 向下 → 沿右侧外绕到目标顶部
    const fromExitY = fromBy + 15;
    const toEntryY = toTy - 15;
    const d = `M${fromCx},${fromBy} ` +
              `L${fromCx},${fromExitY} ` +
              `L${rightX},${fromExitY} ` +
              `L${rightX},${toEntryY} ` +
              `L${toCx},${toEntryY} ` +
              `L${toCx},${toTy}`;
    return {
      d,
      labelX: rightX + 6, labelY: (fromExitY + toEntryY) / 2, labelAnchor: 'start'
    };
  },

  /**
   * 停止指定容器上的动画 interval
   */
  _stopAnimation(containerId) {
    if (this._activeAnimations[containerId]) {
      clearInterval(this._activeAnimations[containerId]);
      delete this._activeAnimations[containerId];
    }
  },

  /**
   * 清理所有正在运行的动画（切换章节时调用）
   */
  stopAllAnimations() {
    Object.keys(this._activeAnimations).forEach(id => {
      clearInterval(this._activeAnimations[id]);
    });
    this._activeAnimations = {};
  },

  /**
   * 计算动画点亮顺序：沿边的拓扑流向（BFS），而非简单的 Y 坐标
   * - 起点：入度为 0 的节点（前向边计入度，回边/虚线不计）
   * - 每一层（同一 BFS 深度）内按 X 坐标从左到右
   * - 保证每个节点在其前驱之后点亮，呈现"数据流"效果
   */
  _computeAnimOrder(nodes, edges) {
    const ids = Object.keys(nodes);
    const inDeg = {};
    const outAdj = {};   // 前向邻接表
    const inAdj = {};    // 前向后驱记录（用于点亮入边）
    ids.forEach(id => { inDeg[id] = 0; outAdj[id] = []; inAdj[id] = []; });

    edges.forEach(e => {
      if (nodes[e.from] && nodes[e.to] && !e.dashed) {
        outAdj[e.from].push(e.to);
        inAdj[e.to].push(e.from);
        inDeg[e.to]++;
      }
    });

    // 起点：入度为 0；若全是循环（无入度 0），取第一个节点
    let layer = ids.filter(id => inDeg[id] === 0);
    if (layer.length === 0) layer = [ids[0]];

    const order = [];
    const visited = new Set();
    while (layer.length) {
      // 同层按 X 从左到右，视觉顺序一致
      layer.sort((a, b) => nodes[a].x - nodes[b].x);
      const next = [];
      layer.forEach(id => {
        if (visited.has(id)) return;
        visited.add(id);
        order.push({ id, preds: inAdj[id] });
        outAdj[id].forEach(to => {
          if (!visited.has(to)) {
            inDeg[to]--;
            if (inDeg[to] <= 0 && !next.includes(to)) next.push(to);
          }
        });
      });
      // 兜底：若拓扑断裂（有环未通过 dashed 标记），把未访问节点补进来
      if (next.length === 0) {
        ids.forEach(id => { if (!visited.has(id)) { visited.add(id); order.push({ id, preds: inAdj[id] }); } });
      }
      layer = next;
    }
    // 补漏
    ids.forEach(id => {
      if (!visited.has(id)) order.push({ id, preds: inAdj[id] });
    });
    return order;
  },

  /**
   * 动画：逐步高亮节点和边（按拓扑流向顺序）
   */
  animateFlow(svg, nodes, edges, containerId) {
    const allNodes = svg.querySelectorAll('.node');
    const allEdges = svg.querySelectorAll('.edge');
    const allLabels = svg.querySelectorAll('.edge-label');

    // 全部暗淡
    allNodes.forEach(n => { n.style.opacity = '0.3'; });
    allEdges.forEach(e => { e.style.opacity = '0.2'; });
    allLabels.forEach(l => { l.style.opacity = '0.2'; });

    // 按边的拓扑流向计算点亮顺序
    const animOrder = this._computeAnimOrder(nodes, edges);
    const litSet = new Set(); // 已点亮的节点 id
    let step = 0;

    // 清理该容器上之前的动画
    this._stopAnimation(containerId);

    const interval = setInterval(() => {
      // 容器已不在 DOM（章节切换），停止动画
      if (!svg.isConnected) {
        this._stopAnimation(containerId);
        return;
      }

      if (step >= animOrder.length) {
        this._stopAnimation(containerId);
        // 全部恢复
        allNodes.forEach(n => { n.style.opacity = '1'; });
        allEdges.forEach(e => { e.style.opacity = '1'; });
        allLabels.forEach(l => { l.style.opacity = '1'; });
        return;
      }

      const { id, preds } = animOrder[step];
      const nodeEl = svg.querySelector(`.node[data-id="${id}"]`);
      if (nodeEl) {
        nodeEl.style.opacity = '1';
        nodeEl.classList.add('highlight');
        // 弹入动画（首次出现时）
        if (!nodeEl.dataset.appeared) {
          nodeEl.dataset.appeared = '1';
          nodeEl.classList.add('appearing');
          setTimeout(() => { if (nodeEl.isConnected) nodeEl.classList.remove('appearing'); }, 500);
        }
        setTimeout(() => { if (nodeEl.isConnected) nodeEl.classList.remove('highlight'); }, 700);
      }
      litSet.add(id);

      // 点亮从已点亮前驱指向当前节点的入边（呈现"数据到达"效果）
      edges.forEach(edge => {
        if (edge.to === id && litSet.has(edge.from)) {
          const edgeEl = svg.querySelector(`.edge[data-from="${edge.from}"][data-to="${edge.to}"]`);
          if (edgeEl) { edgeEl.style.opacity = '1'; edgeEl.classList.add('active'); }
          // 对应边标签也点亮
          allLabels.forEach(l => { l.style.opacity = '0.75'; });
        }
      });

      step++;
    }, 750);

    this._activeAnimations[containerId] = interval;
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
