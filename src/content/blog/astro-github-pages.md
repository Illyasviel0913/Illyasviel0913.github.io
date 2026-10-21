---
title: 用 Astro 和 GitHub Pages 搭一个安静的博客
description: 从零搭一个 Markdown 驱动、push 即部署的个人站点。
pubDate: 2026-10-20
updatedDate: 2026-10-21
category: 技术
tags: [astro, github-pages, blog]
---

这个站点的目标很简单：写 Markdown，push 到 GitHub，然后自动发布。不要数据库，不要后台，也不要为了发一篇文章折腾半小时。

最后选的是 **Astro + GitHub Pages**。

## 为什么是 Astro

Astro 默认输出静态 HTML，没有多余的客户端 JavaScript。对博客这种以内容为主的站点来说，这很合适：打开快，部署简单，SEO 也友好。

更重要的是，它不需要我学一套新的模板语言。页面是 `.astro` 文件，写法接近 HTML + JSX；文章就是普通的 Markdown。

```bash
npm create astro@latest
cd my-blog
npm install
npm run dev
```

## 文章怎么组织

所有文章放在 `src/content/blog/`，每篇一个 Markdown 文件。文件名就是 URL，例如：

```text
src/content/blog/hello-world.md  ->  /blog/hello-world/
```

Frontmatter 里放标题、描述、日期、分类和标签：

```yaml
---
title: 你好，世界
description: 开一个博客，给学习与生活留个存档。
pubDate: 2026-10-22
category: 生活
tags: [life, essay]
---
```

Astro 的 content collections 会在构建时校验这些字段。字段写错或者漏写，构建会直接报错，不会等到线上才发现。

## 部署到 GitHub Pages

在仓库里加一个 workflow：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: withastro/action@v6

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v5
```

然后在仓库的 **Settings → Pages** 里，把 Source 选成 **GitHub Actions**。

之后每次 push 到 `main`，GitHub 会自动构建并部署。第一次跑完之后，站点就出现在 `https://username.github.io/`。

## 自定义域名

域名可以随时改。步骤大概是：

1. 在域名服务商那里加 DNS 记录：根域名用 A 记录指向 GitHub Pages，`www` 用 CNAME 指向 `username.github.io`。
2. 在仓库的 Pages 设置里填入自定义域名。
3. 等 DNS 生效，打开 HTTPS。

内容不用动，仓库也不用迁移。绑定域名只是换了一个入口。

## 一点小结

这套方案没有太多“魔法”：

| 部分 | 作用 |
| --- | --- |
| Astro | 把 Markdown 变成静态页面 |
| GitHub Actions | push 之后自动构建 |
| GitHub Pages | 托管生成的静态文件 |
| RSS | 让读者用阅读器订阅 |

需要维护的东西很少，适合我这种想认真写点东西、但不想维护一套系统的人。

> 工具应该让人更愿意写，而不是把写作变成另一份工作。
