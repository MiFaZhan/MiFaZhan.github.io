# MiYingRuShi 的博客站点仓库

[![GitHub Pages Status](https://img.shields.io/github/deployments/MiFaZhan/MiFaZhan.github.io/github-pages?label=站点状态)](https://github.com/MiFaZhan/MiFaZhan.github.io/deployments)
[![Auto Sync](https://img.shields.io/badge/同步来源-blog仓库-2CA5E0)](https://github.com/MiFaZhan/blog)

此仓库为通过 GitHub Pages 托管的静态博客站点，所有内容由 [blog 仓库](https://github.com/MiFaZhan/blog) 自动生成并同步。

## 🌐 访问地址
- **主站**：<https://mifazhan.top>  
- **GitHub Pages**：<https://mifazhan.github.io>

## 🔄 同步机制
```mermaid
graph TD
  A[blog 仓库更新] --> B{手动触发选项}
  B -->|是| C[更新豆瓣数据]
  B -->|否| D[常规生成]
  D --> E[生成永久链接]
  E --> F[同步源文件]
  F --> G[推送静态页面]
