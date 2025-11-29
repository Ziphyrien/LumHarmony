# LumHarmony

<div align="center">

**智能颜色和谐化工具 | Intelligent Color Harmony Tool**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)](https://vitejs.dev/)
[![APCA](https://img.shields.io/badge/APCA-Enabled-00D1B2)](https://github.com/Myndex/apca-w3)

</div>

---

### 项目简介

LumHarmony 是一款基于 **APCA** 的智能颜色调整工具。它可以自动分析和调整颜色亮度，确保在不同使用场景（浅色模式、普通模式、高对比度模式）下都能获得最佳的视觉和谐度与可访问性。

### 核心特性

- **智能场景适配**：支持浅色模式、普通模式和高对比度模式
- **APCA 对比度计算**：使用前沿的感知对比度算法，比传统 WCAG 2.1 更准确
- **OKLCh 色彩空间**：基于感知均匀的色彩空间进行调整，保持色相和饱和度
- **实时分析反馈**：即时显示对比度评分和可访问性等级
- **多语言支持**：内置中英文界面切换
- **导出功能**：支持导出为 JSON 或 CSS 变量格式
- **批量处理**：一次性处理多个颜色，保持整体和谐

### 快速开始

#### 前置要求

- Node.js >= 18
- pnpm >= 8

#### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/Ziphyrien/LumHarmony.git
cd LumHarmony

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

访问 `http://localhost:5173` 即可使用。

#### 构建生产版本

```bash
pnpm build
pnpm preview
```

### 使用指南

1. **输入颜色**：在输入框中粘贴或输入颜色代码（支持 HEX 格式，如 `#FF5733` 或 `FF5733`）
2. **选择场景**：选择目标使用场景（浅色模式/普通模式/高对比度模式）
3. **查看结果**：查看调整后的颜色、对比度评分和可访问性等级
4. **导出使用**：导出为 JSON 或复制为 CSS 变量

### 场景说明

| 场景 | 用途 | APCA 目标范围 | 适用于 |
|------|------|--------------|--------|
| **浅色模式** | 浅色背景上的深色文本 | 60-95 Lc | 白色或浅色背景的界面 |
| **普通模式** | 保持原始颜色亮度关系 | 无强制要求 | 品牌色、装饰性颜色 |
| **高对比度模式** | 高对比场景 | 60-90 Lc | 无障碍设计、重要信息 |

### 技术栈

- **前端框架**：React 19.2 + TypeScript 5.9
- **构建工具**：Vite (Rolldown-Vite 7.2)
- **样式方案**：Tailwind CSS 4.1
- **色彩处理**：Culori (OKLCh 色彩空间)
- **对比度算法**：APCA-W3
- **动画效果**：Framer Motion
- **代码规范**：ESLint + Commitlint + Husky + lint-staged

### 项目结构

```
LumHarmony/
├── src/
│   ├── components/
│   │   ├── controls/      # 控制组件（输入、场景选择）
│   │   ├── data/          # 数据展示组件（颜色表格）
│   │   └── layout/        # 布局组件
│   ├── lib/
│   │   ├── color-utils.ts # 颜色处理核心逻辑
│   │   ├── i18n.ts        # 国际化
│   │   └── types.ts       # TypeScript 类型定义
│   ├── App.tsx            # 主应用组件
│   └── main.tsx           # 应用入口
├── design_docs.md         # 设计文档
└── package.json
```

### 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add some amazing feature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

请遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

### 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

### 致谢

- [APCA](https://github.com/Myndex/apca-w3) - 先进的感知对比度算法
- [Culori](https://culorijs.org/) - 强大的颜色处理库
- [OKLCh](https://bottosson.github.io/posts/oklab/) - 感知均匀的色彩空间
