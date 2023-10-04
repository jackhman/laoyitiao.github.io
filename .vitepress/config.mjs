import { defineConfig } from 'vitepress'

import dataLoader from '../posts/posts.data.js'

import markdownItTitle from 'markdown-it-title'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
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
    attrs: {
      disable: true
    },
    defaultHighlightLang: 'html',
    config: (md) => {
      md.use(markdownItTitle);
    }
  },
  vite: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    ssr: { noExternal: ['element-plus'] }
  },
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
      { text: '文章', link: '/posts/' },
      { text: '阅读推荐', link: '/posts/recommend' }
    ],
    sidebar: {
      ...dataLoader.load().sirderBar
    },
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
