import DefaultTheme from 'vitepress/theme'
import './custom.css'
import BlogOverview from './layouts/BlogOverview.vue'
import BlogDetail from './layouts/BlogDetail.vue'
import AboutPage from './layouts/AboutPage.vue'
import SessionsPage from './layouts/SessionsPage.vue'
import HomePage from './layouts/HomePage.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Register custom layouts
    app.component('BlogOverview', BlogOverview)
    app.component('BlogDetail', BlogDetail)
    app.component('AboutPage', AboutPage)
    app.component('SessionsPage', SessionsPage)
    app.component('HomePage', HomePage)
  }
}


