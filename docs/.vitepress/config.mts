import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'GuardZero Docs',
  description: 'Developer documentation for ValidFi, privacy-preserving health credentials on Stellar Soroban',
  base: '/docs/',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'SDK', link: '/sdk/' },
      { text: 'REST API', link: '/api/' },
      { text: 'Contracts', link: '/contracts/' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/guide/introduction' },
          { text: 'Architecture', link: '/guide/architecture' },
          { text: 'Running locally', link: '/guide/getting-started' },
          { text: 'Contributing', link: '/guide/contributing' },
        ],
      },
      { text: 'SDK', items: [{ text: 'Overview', link: '/sdk/' }] },
      { text: 'REST API', items: [{ text: 'Endpoints', link: '/api/' }] },
      { text: 'Smart contracts', items: [{ text: 'Overview', link: '/contracts/' }] },
      { text: 'Zero-knowledge proofs', items: [{ text: 'Overview', link: '/zk/' }] },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/GuardZero144' }],
    editLink: {
      pattern: 'https://github.com/GuardZero144/docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    search: { provider: 'local' },
  },
});
