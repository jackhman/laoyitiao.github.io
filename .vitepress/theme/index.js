import Theme from 'vitepress/theme'
import './style.css'
import MyLayout from './Layout.vue'
import InstantSearch from 'vue-instantsearch/vue3/es';
import Image from './Image.vue'
export default {
  extends: Theme,
  Layout: MyLayout,
  enhanceApp({ app, router, siteData }) {
    app.use(InstantSearch);
    app.component('Image',Image);
  }
}
