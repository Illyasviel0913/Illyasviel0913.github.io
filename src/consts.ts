export const SITE = {
  title: 'Illyasviel',
  tagline: '技术、学习与生活',
  description: '记录技术学习、项目笔记与生活片段。',
  author: 'Illyasviel',
  url: import.meta.env.SITE ?? 'https://illyasviel0913.github.io',
  github: 'https://github.com/Illyasviel0913',
  nav: [
    { href: '/', label: '首页' },
    { href: '/blog/', label: '文章' },
    { href: '/tags/', label: '标签' },
    { href: '/about/', label: '关于' },
  ],
} as const;

export const CATEGORIES = [
  {
    name: '技术',
    slug: 'tech',
    description: '工程实践、工具使用、踩坑记录。',
  },
  {
    name: '生活',
    slug: 'life',
    description: '日常、阅读、行走，以及一些无关紧要的瞬间。',
  },
] as const;
