export const SITE = {
  title: 'Illyasviel',
  name: 'Taffy',
  handle: 'Illyasviel0913',
  tagline: '学习、生活与记录',
  description: '记录学习笔记、生活动态与一些片段。',
  author: 'Illyasviel',
  url: import.meta.env.SITE ?? 'https://illyasviel0913.github.io',
  github: 'https://github.com/Illyasviel0913',
  nav: [
    { href: '/', label: '首页' },
    { href: '/categories/study/', label: '学习笔记' },
    { href: '/categories/life/', label: '生活动态' },
    { href: '/about/', label: '关于' },
  ],
} as const;

export const CATEGORIES = [
  {
    name: '学习笔记',
    slug: 'study',
    short: '学',
    description: '课程、读书、技术实践与踩坑记录。',
  },
  {
    name: '生活动态',
    slug: 'life',
    short: '生',
    description: '日常、阅读、行走，和一些生活片段。',
  },
] as const;
