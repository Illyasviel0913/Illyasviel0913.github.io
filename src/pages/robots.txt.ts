import type { APIContext } from 'astro';

export function GET(context: APIContext) {
  const site = (
    context.site?.toString() ?? 'https://illyasviel0913.github.io'
  ).replace(/\/$/, '');

  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap-index.xml\n`,
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    },
  );
}
