"""
素问居 - 中医养生数据可视化生成
使用 scientific-visualization 的 matplotlib 规范生成:
1. 九种体质分布图（雷达图）
2. 节气养生热度图
3. 草药性味归经图
"""
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')
import numpy as np
from matplotlib.patches import FancyBboxPatch
import os

# ========== 配色体系（素问居品牌色）==========
COLORS = {
    'primary':    '#4A7C59',   # 翠绿
    'secondary':  '#8B5E3C',   # 檀木褐
    'accent':     '#C4A35A',   # 暖金
    'light':      '#F5F0E8',   # 暖白
    'dark':       '#2D3A2E',   # 深绿
    'text':       '#3D3D3D',   # 正文
    'muted':      '#7A7A6A',   # 灰调
    'paper':      '#FAF6F0',   # 宣纸白
    'sage':       '#7A9E7E',   # 鼠尾草绿
    'bamboo':     '#A8C69F',   # 竹绿
}

plt.rcParams['font.family'] = ['sans-serif']
plt.rcParams['axes.unicode_minus'] = False

OUTPUT = r'F:\xuanjige\public\images'
os.makedirs(OUTPUT, exist_ok=True)


def save(fig, name):
    path = os.path.join(OUTPUT, f'{name}.png')
    fig.savefig(path, dpi=150, bbox_inches='tight',
                facecolor='none', edgecolor='none')
    plt.close(fig)
    print(f'  ✓ {name}.png')
    return path


# ============================================================
# 1. 九种体质雷达图
# ============================================================
def make_constitution_radar():
    categories = [
        '平和质', '气虚质', '阳虚质', '阴虚质',
        '痰湿质', '湿热质', '血瘀质', '气郁质', '特禀质'
    ]
    # 模拟示例用户（气虚+阳虚型）
    values = [6, 8, 7, 5, 4, 3, 4, 3, 2]

    N = len(categories)
    angles = np.linspace(0, 2 * np.pi, N, endpoint=False).tolist()
    values = values + [values[0]]
    angles = angles + [angles[0]]

    fig, ax = plt.subplots(figsize=(6, 6), subplot_kw=dict(polar=True))
    fig.patch.set_facecolor('none')

    # 填充区域
    ax.fill(angles, values, color=COLORS['primary'], alpha=0.25)
    ax.plot(angles, values, color=COLORS['primary'], linewidth=2.5, marker='o', markersize=7)

    # 网格
    ax.set_rgrids([2, 4, 6, 8, 10], color='#CCCCCC', linewidths=0.8)
    ax.set_ylim(0, 10)

    # 标签
    ax.set_xticks(angles[:-1])
    ax.set_xticklabels(categories, size=11, color=COLORS['dark'], fontproperties=None)

    # 标题
    ax.set_title('九种体质测评示例', size=14, color=COLORS['dark'],
                 pad=20, fontweight='bold')

    # 去掉径向标签
    ax.set_yticklabels([], color='none')

    plt.tight_layout()
    return save(fig, 'constitution-radar')


# ============================================================
# 2. 二十四节气养生热度图
# ============================================================
def make_solar_terms_heatmap():
    # 24节气 × 4个养生维度
    terms = [
        '立春', '雨水', '惊蛰', '春分', '清明', '谷雨',
        '立夏', '小满', '芒种', '夏至', '小暑', '大暑',
        '立秋', '处暑', '白露', '秋分', '寒露', '霜降',
        '立冬', '小雪', '大雪', '冬至', '小寒', '大寒'
    ]
    dimensions = ['养肝', '养心', '健脾', '润肺']

    # 模拟热度分值 (0-10)
    data = np.array([
        [7, 5, 6, 5],  # 立春
        [6, 5, 7, 5],  # 雨水
        [8, 6, 6, 5],  # 惊蛰
        [7, 6, 6, 6],  # 春分
        [7, 6, 5, 6],  # 清明
        [6, 6, 7, 7],  # 谷雨
        [5, 8, 6, 6],  # 立夏
        [5, 8, 7, 6],  # 小满
        [5, 7, 8, 5],  # 芒种
        [4, 9, 6, 6],  # 夏至
        [4, 9, 6, 5],  # 小暑
        [4, 9, 5, 5],  # 大暑
        [6, 7, 5, 7],  # 立秋
        [6, 7, 6, 7],  # 处暑
        [6, 6, 5, 8],  # 白露
        [7, 6, 5, 8],  # 秋分
        [7, 5, 5, 8],  # 寒露
        [7, 5, 5, 7],  # 霜降
        [6, 5, 6, 6],  # 立冬
        [6, 5, 6, 5],  # 小雪
        [6, 5, 6, 5],  # 大雪
        [5, 5, 6, 5],  # 冬至
        [5, 5, 6, 5],  # 小寒
        [5, 5, 6, 5],  # 大寒
    ])

    fig, ax = plt.subplots(figsize=(10, 12))
    fig.patch.set_facecolor('none')
    ax.set_facecolor('#F8F5F0')

    # 用绿-金色系 colormap
    cmap = plt.cm.RdYlGn
    im = ax.imshow(data, cmap=cmap, aspect='auto', vmin=0, vmax=10)

    # 设置刻度
    ax.set_xticks(range(4))
    ax.set_xticklabels(dimensions, size=12, color=COLORS['dark'])
    ax.set_yticks(range(24))
    ax.set_yticklabels(terms, size=10, color=COLORS['dark'])

    # 数值标注
    for i in range(24):
        for j in range(4):
            val = data[i, j]
            color = 'white' if val > 6.5 else COLORS['dark']
            ax.text(j, i, f'{val}', ha='center', va='center',
                    color=color, fontsize=9, fontweight='bold')

    ax.set_title('二十四节气养生热度图', size=14, color=COLORS['dark'],
                 pad=12, fontweight='bold')

    # 颜色条
    cbar = fig.colorbar(im, ax=ax, fraction=0.04, pad=0.02)
    cbar.set_label('养生重点程度', size=10)

    plt.tight_layout()
    return save(fig, 'solar-terms-heatmap')


# ============================================================
# 3. 草药性味归经气泡图
# ============================================================
def make_herb_scatter():
    herbs = [
        ('人参', 3, 8, '脾', 9),
        ('黄芪', 2, 7, '脾', 8),
        ('枸杞', 3, 6, '肝', 7),
        ('当归', 3, 7, '肝', 8),
        ('川芎', 2, 6, '肝', 6),
        ('茯苓', 2, 5, '心', 7),
        ('陈皮', 2, 4, '脾', 5),
        ('甘草', 3, 6, '心', 10),
        ('生姜', 2, 8, '脾', 5),
        ('红枣', 3, 5, '心', 6),
        ('山药', 3, 5, '脾', 7),
        ('莲子', 3, 5, '心', 6),
        ('百合', 3, 5, '肺', 5),
        ('菊花', 2, 6, '肝', 6),
        ('金银花', 2, 7, '肺', 5),
    ]

    fig, ax = plt.subplots(figsize=(10, 8))
    fig.patch.set_facecolor(COLORS['paper'])
    ax.set_facecolor('#F8F5F0')

    # 按归经着色
    organ_colors = {'脾': '#4A7C59', '肝': '#C4A35A', '心': '#C07060', '肺': '#5A8FAF'}
    organ_size = {'脾': 300, '肝': 250, '心': 280, '肺': 200}

    for herb, taste, effect, organ, freq in herbs:
        ax.scatter(taste, effect, s=organ_size.get(organ, 200),
                   color=organ_colors.get(organ, '#888'),
                   alpha=0.75, edgecolors='white', linewidths=1.5)
        ax.annotate(herb, (taste, effect), fontsize=9,
                    ha='center', va='bottom',
                    xytext=(0, 5), textcoords='offset points',
                    color=COLORS['dark'])

    # 图例
    for organ, color in organ_colors.items():
        ax.scatter([], [], s=150, color=color, label=f'{organ}经', alpha=0.75)
    ax.legend(title='归经', loc='upper right', frameon=True,
              facecolor='white', edgecolor='none')

    ax.set_xlabel('五味得分（1=酸苦甘辛咸）', size=11, color=COLORS['dark'])
    ax.set_ylabel('功效强度（1-10）', size=11, color=COLORS['dark'])
    ax.set_title('常用草药性味归经图', size=14, color=COLORS['dark'],
                 pad=12, fontweight='bold')
    ax.set_xlim(1, 5)
    ax.set_ylim(3, 11)
    ax.grid(True, alpha=0.3, color='#CCCCCC')

    plt.tight_layout()
    return save(fig, 'herb-properties')


if __name__ == '__main__':
    print('🎨 生成素问居数据可视化...')
    make_constitution_radar()
    make_solar_terms_heatmap()
    make_herb_scatter()
    print('\n✅ 全部生成完毕！')
