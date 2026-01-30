import DefaultTheme from 'vitepress/theme'
import './custom.css'
import BlogOverview from './layouts/BlogOverview.vue'
import BlogDetail from './layouts/BlogDetail.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Register custom layouts
    app.component('BlogOverview', BlogOverview)
    app.component('BlogDetail', BlogDetail)
  }
}


