import { defineConfig, type HeadConfig } from 'vitepress'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'
import { copyFileSync, mkdirSync, existsSync, readdirSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Build hook to copy blog banner images to dist folder
function copyBlogImages() {
  const blogsDir = resolve(__dirname, '../blogs')
  const distBlogsDir = resolve(__dirname, './dist/blogs')
  
  try {
    const blogFolders = readdirSync(blogsDir, { withFileTypes: true })
      .filter((dirent: any) => dirent.isDirectory())
      .map((dirent: any) => dirent.name)
    
    blogFolders.forEach((blogFolder: string) => {
      const sourceBanner = resolve(blogsDir, blogFolder, 'assets/banner.png')
      if (existsSync(sourceBanner)) {
        const destDir = resolve(distBlogsDir, blogFolder, 'assets')
        if (!existsSync(destDir)) {
          mkdirSync(destDir, { recursive: true })
        }
        const destBanner = resolve(destDir, 'banner.png')
        copyFileSync(sourceBanner, destBanner)
        console.log(`✓ Copied banner: ${blogFolder}`)
      }
    })
  } catch (error) {
    console.warn('⚠ Error copying blog images:', error)
  }
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "arjanrijsdijk.com",
  description: "All Things Power Platform Blog",
  appearance: false,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/assets/logo.svg' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/logo.svg' }],
    ['script', {}, `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "vb9xtou69c");`]
  ],
  transformHead({ pageData }) {
    const head: HeadConfig[] = []

    if (pageData.frontmatter.layout === 'BlogDetail') {
      // Derive /blogs/{folder} from the relative path (e.g. blogs/my-post/index.md)
      const parts = pageData.relativePath.split('/')
      const folder = parts.length >= 2 ? parts[parts.length - 2] : ''
      const ogUrl = `/blogs/${folder}`

      if (pageData.frontmatter.title) {
        head.push(['meta', { property: 'og:title', content: pageData.frontmatter.title }])
      }
      if (pageData.frontmatter.description) {
        head.push(['meta', { property: 'og:description', content: pageData.frontmatter.description }])
      }
      if (pageData.frontmatter.image) {
        head.push(['meta', { property: 'og:image', content: pageData.frontmatter.image }])
      }
      head.push(['meta', { property: 'og:url', content: ogUrl }])
      head.push(['meta', { property: 'og:type', content: 'article' }])
    }

    return head
  },
  buildEnd() {
    copyBlogImages()
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "data:image/svg+xml,%3csvg%20width='64'%20height='64'%20viewBox='0%200%2064%2064'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M45.5625%2012.0142C51.6676%209.68287%2057.4852%209.1743%2063%2010.5389C55.8656%2010.8309%2049.9723%2012.0042%2046.3849%2014.8089C42.3485%2021.7123%2045.8804%2040.5244%2023.1753%2041.0782C19.0329%2049.3362%2014.3153%2055.2779%208.54313%2057.005C10.1173%2051.9193%2018.4375%2034.7085%2023.0239%2032.0398C17.2669%2031.642%2016.3789%2030.2422%2019.8957%2027.936C8.37663%2027.4828%205.84375%2025.66%2012.8319%2022.518C4.19384%2020.8009%201.14127%2016.828%205.43001%2015.2973C1.52978%2012.3869%200.268388%208.31829%201.41878%205C8.48258%2011.7927%2018.9622%2014.2348%2029.1341%2020.3981C31.9748%2010.987%2038.7812%208.1622%2045.5625%2012.0142ZM39.5078%2012.7141C39.4592%2012.7089%2039.4101%2012.7089%2039.3615%2012.7141C39.5018%2012.6614%2039.6505%2012.6341%2039.8005%2012.6336C40.0917%2012.6325%2040.374%2012.7341%2040.5975%2012.9205C40.8211%2013.1068%2040.9715%2013.366%2041.0222%2013.6522C41.073%2013.9384%2041.0209%2014.2334%2040.875%2014.485C40.7292%2014.7366%2040.499%2014.9287%2040.225%2015.0275C39.9511%2015.1263%2039.651%2015.1253%2039.3777%2015.0248C39.1044%2014.9244%2038.8754%2014.7308%2038.7311%2014.4783C38.5869%2014.2258%2038.5366%2013.9305%2038.5891%2013.6446C38.6417%2013.3587%2038.7937%2013.1005%2039.0184%2012.9156C38.9033%2013.0363%2038.8399%2013.1971%2038.8418%2013.3637C38.8418%2013.4952%2038.8809%2013.6237%2038.954%2013.733C39.0272%2013.8423%2039.1312%2013.9275%2039.2529%2013.9778C39.3746%2014.0281%2039.5085%2014.0412%2039.6377%2014.0156C39.7669%2013.99%2039.8856%2013.9267%2039.9788%2013.8337C40.0719%2013.7407%2040.1353%2013.6223%2040.161%2013.4934C40.1867%2013.3644%2040.1735%2013.2308%2040.1231%2013.1094C40.0727%2012.9879%2039.9874%2012.8841%2039.8778%2012.8111C39.7683%2012.738%2039.6395%2012.699%2039.5078%2012.699V12.7141Z'%20fill='%23F24849'/%3e%3c/svg%3e",
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog' },
      { text: 'Events', link: '/events' },
      { text: 'About', link: '/about' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/arijsdijk' },
      { icon: 'linkedin', link: 'https://linkedin.com/in/arjanrijsdijk' },
      { icon: 'x', link: 'https://x.com/arjanrijsdijk' },
      { 
        icon: { 
          svg: '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/></svg>' 
        }, 
        link: 'https://bsky.app/profile/arjanrijsdijk.com' 
      }
    ]
  }
})
