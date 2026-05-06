---
title: Next.js 14 开发指南
date: 2026-05-03
tags: [Next.js, 前端]
summary: 一份关于 Next.js 14 App Router 的实用开发指南，涵盖路由、数据获取和部署。
---

Next.js 14 带来了很多新特性，其中最值得关注的是 App Router。

## App Router 优势

- **嵌套布局**：可以共享 UI，同时保持状态
- **服务端组件**：减少客户端 JavaScript 体积
- **流式传输**：逐步渲染页面，提升感知性能

## 静态导出

对于个人网站这种内容型站点，静态导出是最佳选择：

```bash
next build
```

配合 `output: 'export'` 配置，可以生成纯静态 HTML 文件。

## 总结

Next.js 14 在开发体验和性能上都有显著提升，是构建现代网站的首选框架。
