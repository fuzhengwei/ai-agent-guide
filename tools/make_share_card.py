#!/usr/bin/env python3
"""生成小程序分享卡片小图：miniprogram/assets/share-card.png（500x400，微信 5:4）
绘制品牌信息（标题/副标题/卖点条），右下角留出 logo 粘贴位。"""
from PIL import Image, ImageDraw, ImageFont

W, H = 500, 400
FONT_R = '/System/Library/Fonts/Hiragino Sans GB.ttc'   # index 0 = W3 常规
FONT_B = '/System/Library/Fonts/Hiragino Sans GB.ttc'   # index 2 = W6 粗
IDX_R, IDX_B = 0, 2
LOGO = '/Users/fuzhengwei/DevOps/ai-agent-guide.xiaofuge.cn/assets/site-logo.png'
OUT = '/Users/fuzhengwei/DevOps/ai-agent-guide.xiaofuge.cn/miniprogram/assets/share-card.png'

img = Image.new('RGB', (W, H))
d = ImageDraw.Draw(img)

# ---- 深色竖向渐变底（#121a30 -> #0b1120）----
c0 = (18, 26, 48)
c1 = (11, 17, 32)
for y in range(H):
    t = y / (H - 1)
    d.line([(0, y), (W, y)], fill=tuple(int(a + (b - a) * t) for a, b in zip(c0, c1)))

# ---- 装饰：右上紫色光晕 ----
glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
gd.ellipse([W - 190, -140, W + 90, 140], fill=(124, 93, 246, 40))
gd.ellipse([W - 140, -90, W + 40, 90], fill=(59, 130, 246, 30))
img = Image.alpha_composite(img.convert('RGBA'), glow)
d = ImageDraw.Draw(img)

# ---- 顶部金色装饰线 ----
d.rectangle([0, 0, W, 5], fill=(212, 165, 116))

# ---- 标题 ----
f_title = ImageFont.truetype(FONT_B, 40, index=IDX_B)
d.text((W / 2, 118), 'AI Agent 通识教程', font=f_title, fill=(241, 245, 249), anchor='mm')

# ---- 副标题 ----
f_sub = ImageFont.truetype(FONT_R, 18, index=IDX_R)
d.text((W / 2, 168), '从基础认知到面试通关 · 28 章渐进式教程', font=f_sub, fill=(148, 163, 184), anchor='mm')

# ---- 卖点胶囊 ----
f_pill = ImageFont.truetype(FONT_B, 13, index=IDX_B)
items = ['28 章体系', '动画拆解', '463 道面试题', '模拟面试']
# 逐个量宽，水平居中排布
pads, gap = 24, 12
widths = [d.textlength(t, font=f_pill) + pads for t in items]
total = sum(widths) + gap * (len(items) - 1)
x = (W - total) / 2
y0, y1 = 218, 252
for t, w in zip(items, widths):
    d.rounded_rectangle([x, y0, x + w, y1], radius=17,
                        outline=(212, 165, 116, 200), width=1)
    d.text((x + w / 2, (y0 + y1) / 2), t, font=f_pill, fill=(212, 165, 116), anchor='mm')
    x += w + gap

# ---- logo（右下，缩到约 20% 宽）----
logo = Image.open(LOGO).convert('RGBA')
lw = 100
logo = logo.resize((lw, int(logo.height * lw / logo.width)), Image.LANCZOS)
img.alpha_composite(logo, (W - lw - 26, H - logo.height - 22))

# ---- 底部域名 ----
f_foot = ImageFont.truetype(FONT_R, 12, index=IDX_R)
d.text((W / 2, H - 28), 'ai-agent-guide.xiaofuge.cn', font=f_foot, fill=(100, 116, 139), anchor='mm')

img.convert('RGB').save(OUT, 'PNG', optimize=True)
print('saved:', OUT)
