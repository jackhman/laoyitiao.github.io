import { defineConfig } from 'vitepress'

import dataLoader from '../posts/posts.data.js'

import markdownItTitle from 'markdown-it-title'

markdownItTitle.defaults = {
  level: 0,
  excerpt: 0
}
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Docs",
  description: "A VitePress Site",
  ignoreDeadLinks: true,
  lang: 'zh-CN',
  markdown: {
    lineNumbers: true,
    attrs: {
      disable: true
    },
    defaultHighlightLang: 'html',
    config: (md) => {
      md.use(markdownItTitle);
    }
  },
  // vite: {
  //   plugins: [
  //     AutoImport({
  //       resolvers: [ArcoResolver()],
  //     }),
  //     Components({
  //       resolvers: [
  //         ArcoResolver({
  //           sideEffect: true
  //         })
  //       ]
  //     })
  //   ],
  //   ssr: { noExternal: ['@arco-design/web-vue'] }
  // },
  themeConfig: {
    logo: '/logo/sloth64.png',
    outline: 'deep',
    lastUpdated: {
      text: '更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    sidebar: {
      '/': {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      ...dataLoader.load().sirderBar
    },
    footer: {
      message: 'Released under the <a href="https://github.com/laoyitiao/docs/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2023-present <a href="https://github.com/laoyitiao">hhh</a>'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/laoyitiao/docs',ariaLabel: 'github rep' }
    ],
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          options: {
            fields: ['title'],
          },
          searchOptions: {
            boost: { title: 2 },
            fuzzy: 0.2
          }
        }
      }
    }
  },
})
