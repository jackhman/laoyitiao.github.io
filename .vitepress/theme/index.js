import Theme from 'vitepress/theme'
import './style.css'
import MyLayout from './Layout.vue'

import Comment from './Comment.vue'

export default {
  extends: Theme,
  Layout: MyLayout,
  enhanceApp({ app, router, siteData }) {
    app.component('Comment',Comment)
  }
}
