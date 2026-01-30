import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "rsdk.dev",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog' },
      { text: 'Sessions', link: '/sessions' },
      { text: 'About', link: '/about' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/arjanrijsdijk' },
      { icon: 'linkedin', link: 'https://linkedin.com/in/arjanrijsdijk' },
      { icon: 'x', link: 'https://x.com/arjanrijsdijk' },
      { icon: 'youtube', link: 'https://youtube.com/@arjanrijsdijk' }
    ]
  }
})
