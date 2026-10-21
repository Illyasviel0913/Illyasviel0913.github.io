# Illyasviel

一个记录技术学习与生活片段的个人博客。

## 技术栈

- **Astro**：静态站点生成，Markdown 写作
- **GitHub Pages**：免费托管
- **GitHub Actions**：push 到 `main` 自动构建部署
- **RSS + sitemap**：订阅与搜索引擎收录
- 无数据库、无后端、无客户端框架

## 本地开发

```bash
npm install
npm run dev
```

打开 `http://localhost:4321`。

构建和预览：

```bash
npm run build
npm run preview
```

## 写文章

在 `src/content/blog/` 下新建 Markdown 文件，文件名就是 URL：

```text
src/content/blog/my-post.md  ->  /blog/my-post/
```

Frontmatter 格式：

```yaml
---
title: 文章标题
description: 一句话摘要，会显示在列表和 SEO 里
pubDate: 2026-10-22
# updatedDate: 2026-10-23  # 可选
category: 技术              # 技术 / 生活
tags: [astro, notes]        # 建议用英文小写，URL 更干净
# cover: /images/xxx.jpg    # 可选：文章封面图（放到 public/ 下）
draft: false                # true 时只在开发环境显示
---
```

正文直接用 Markdown。支持代码高亮、表格、引用、图片等。

## 部署

仓库已经包含 `.github/workflows/deploy.yml`。

首次部署：

1. 打开仓库 **Settings → Pages**
2. 把 **Source** 选为 **GitHub Actions**
3. push 到 `main`，等待 Actions 完成

站点地址：<https://illyasviel0913.github.io/>

## 绑定自定义域名

域名可以随时绑定或更换，不需要迁移内容。

### 1. 配 DNS

根域名（例如 `example.com`）添加 4 条 A 记录：

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

`www` 子域名添加 CNAME：

```text
www -> Illyasviel0913.github.io
```

### 2. 告诉 GitHub

仓库 **Settings → Pages → Custom domain** 填入域名，保存后等待 DNS 检查通过。

也可以在 `public/CNAME` 里写一行域名：

```text
example.com
```

### 3. 更新站点地址

修改 `astro.config.mjs`：

```js
site: 'https://example.com',
```

`robots.txt`、RSS、sitemap、canonical 都会自动跟着变。

### 4. 打开 HTTPS

DNS 生效后，在 Pages 设置里勾选 **Enforce HTTPS**。

## 目录结构

```text
.
├── .github/workflows/deploy.yml   # 自动部署
├── public/                        # favicon、OG 图、manifest
├── src/
│   ├── components/                # Header、Footer、文章卡片
│   ├── content/blog/              # 所有文章
│   ├── layouts/BaseLayout.astro   # 页面骨架、SEO、主题
│   ├── pages/                     # 路由
│   ├── styles/global.css          # 全站样式
│   ├── utils/posts.ts             # 文章查询、日期、阅读时长
│   ├── consts.ts                  # 站点信息、导航、分类
│   └── content.config.ts          # 文章 frontmatter 校验
├── astro.config.mjs               # site、sitemap、代码高亮
└── package.json
```

## 常改的地方

- 站点名称、简介、GitHub 链接：`src/consts.ts`
- 首页入场动画、个人信息：`src/components/HomeIntro.astro`
- 头像：`public/avatar.png`
- 亮色 / 暗色主题变量：`src/styles/global.css` 顶部
- 主题背景图：`public/images/`（来源见 `public/images/CREDITS.md`）
- 关于页自我介绍：`src/pages/about.astro`
- 颜色、字体、间距：`src/styles/global.css`
- 部署域名：`astro.config.mjs`

## 可选扩展

- **评论**：接入 [Giscus](https://giscus.app/)，基于 GitHub Discussions，不需要后端
- **搜索**：接入 [Pagefind](https://pagefind.app/)，构建时生成静态索引
- **访问统计**：Umami、Plausible 或 Cloudflare Web Analytics
- **图片**：放到 `src/assets/` 后用 Astro 的 `<Image />` 自动优化
