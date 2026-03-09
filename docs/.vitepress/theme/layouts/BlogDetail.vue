<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { data as blogPosts } from '../blog.data'
import { computed, onMounted, ref, onUnmounted } from 'vue'
import Footer from '../components/Footer.vue'

const { frontmatter, page } = useData()

function setMetaTag(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// Extract headings from the current page
const tocHeaders = computed(() => {
  // Try to get headers from page metadata
  if (page.value.headers && page.value.headers.length > 0) {
    return page.value.headers.filter(h => h.level >= 2 && h.level <= 3)
  }
  
  // Fallback: parse from rendered content after mount
  return []
})

// Parse headings from DOM after content is rendered
const domHeaders = ref<Array<{title: string, link: string, level: number}>>([])

// Lightbox
const lightboxOpen = ref(false)
const lightboxSrc = ref('')
const lightboxAlt = ref('')

function openLightbox(src: string, alt: string) {
  lightboxSrc.value = src
  lightboxAlt.value = alt
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

function onLightboxKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeLightbox()
}

// Scroll to top functionality
const showScrollTop = ref(false)

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  // Set Open Graph meta tags — social crawlers require absolute URLs
  const origin = window.location.origin
  const folder = page.value.relativePath.split('/').slice(-2, -1)[0] ?? ''
  const image = frontmatter.value.image ?? ''
  // /assets/... paths are relative to the blog folder, not the site root
  const resolvedImage = image.startsWith('http')
    ? image
    : image.startsWith('/assets/')
      ? `${origin}/blogs/${folder}${image}`
      : `${origin}${image}`
  setMetaTag('og:title', frontmatter.value.title ?? '')
  setMetaTag('og:description', frontmatter.value.description ?? '')
  setMetaTag('og:image', resolvedImage)
  setMetaTag('og:url', `${origin}/blogs/${folder}`)
  setMetaTag('og:type', 'article')

  // Wait for content to render, then extract headings and wire up lightbox
  setTimeout(() => {
    const contentEl = document.querySelector('.article-content')
    if (contentEl) {
      const headings = contentEl.querySelectorAll('h2, h3')
      domHeaders.value = Array.from(headings).map(h => ({
        title: h.textContent?.replace(/^#\s*/, '') || '',
        link: '#' + h.id,
        level: parseInt(h.tagName.substring(1))
      }))

      // Wire up lightbox for images
      const images = contentEl.querySelectorAll('img')
      images.forEach((img: HTMLImageElement) => {
        img.style.cursor = 'zoom-in'
        img.addEventListener('click', () => openLightbox(img.src, img.alt))
      })
    }
  }, 100)

  // Keyboard listener for lightbox
  window.addEventListener('keydown', onLightboxKeydown)
  
  // Add scroll listener
  window.addEventListener('scroll', handleScroll)
})

// Cleanup on unmount
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', onLightboxKeydown)
  document.body.style.overflow = ''
})

const displayHeaders = computed(() => {
  return tocHeaders.value.length > 0 ? tocHeaders.value : domHeaders.value
})

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).toUpperCase()
}

function getReadingTime(description: string) {
  const words = description.split(' ').length
  const minutes = Math.ceil(words / 200)
  return `${minutes} Min Read`
}

function getCategoryFromTags(tags: any) {
  if (Array.isArray(tags) && tags.length > 0) {
    return tags[0]
  }
  if (typeof tags === 'string') {
    const tagArray = tags.split(',').map(t => t.trim())
    return tagArray[0]
  }
  return 'General'
}

function navigateToTagFilter(tag: string) {
  window.location.href = `/blog?tag=${encodeURIComponent(tag)}`
}
</script>

<template>
  <div class="custom-layout">
    <!-- Article Container -->
    <main style="flex: 1; padding: 6rem 1.5rem; display: flex; flex-direction: column; align-items: center;">
      <article style="max-width: 720px; width: 100%;">
        <!-- Article Header -->
        <div style="display: flex; flex-direction: column; gap: 2rem; margin-bottom: 5rem; text-align: center; align-items: center;">
          <div style="display: inline-block;">
            <span style="background-color: var(--accent-red); color: white; font-size: 0.6875rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.25em; padding: 0.5rem 1.25rem;">
              {{ getCategoryFromTags(frontmatter.tags) }}
            </span>
          </div>
          
          <h1 style="color: var(--dark-navy); font-size: 3rem; font-weight: 900; line-height: 1.05; letter-spacing: -0.05em; margin: 0;">
            {{ frontmatter.title }}
          </h1>


          <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 2rem; padding: 2.5rem 0; border-top: 1px solid rgba(35, 47, 52, 0.1); border-bottom: 1px solid rgba(35, 47, 52, 0.1); width: 100%; margin-top: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <div style="text-align: left;">
                <p style="font-size: 0.625rem; text-transform: uppercase; font-weight: 700; letter-spacing: 0.1em; color: rgba(35, 47, 52, 0.4); margin: 0 0 0.125rem 0;">Author</p>
                <p style="font-size: 0.875rem; font-weight: 900; color: var(--dark-navy); margin: 0;">{{ frontmatter.author }}</p>
              </div>
            </div>
            
            <div style="text-align: left;">
              <p style="font-size: 0.625rem; text-transform: uppercase; font-weight: 700; letter-spacing: 0.1em; color: rgba(35, 47, 52, 0.4); margin: 0 0 0.125rem 0;">Published</p>
              <p style="font-size: 0.875rem; font-weight: 900; color: var(--dark-navy); text-transform: uppercase; margin: 0;">{{ formatDate(frontmatter.date) }}</p>
            </div>
            
          </div>


        </div>


        <!-- Article Content -->
        <div class="article-content">
          <!-- Table of Contents -->
          <details class="toc-collapsible" v-if="displayHeaders.length > 0">
            <summary>Table of Contents</summary>
            <nav class="table-of-contents">
              <ul>
                <li v-for="header in displayHeaders" :key="header.link" :style="{ paddingLeft: `${(header.level - 2) * 1}rem` }">
                  <a :href="header.link">{{ header.title }}</a>
                </li>
              </ul>
            </nav>
          </details>
          
          <Content />
        </div>

        <!-- Footer Meta -->
        <div style="margin-top: 6rem; padding-top: 3rem; border-top: 1px solid rgba(35, 47, 52, 0.1); display: flex; flex-direction: column; gap: 2rem; align-items: center;">
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <span 
              v-for="tag in (Array.isArray(frontmatter.tags) ? frontmatter.tags : frontmatter.tags?.split(',').map(t => t.trim()) || [])"
              :key="tag"
              @click="navigateToTagFilter(tag)"
              style="padding: 0.5rem 1.25rem; background-color: white; border: 1px solid rgba(35, 47, 52, 0.1); font-size: 0.625rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; transition: all 0.3s ease; cursor: pointer;"
              @mouseenter="$event.target.style.borderColor = 'var(--accent-red)'"
              @mouseleave="$event.target.style.borderColor = 'rgba(35, 47, 52, 0.1)'"
            >
              {{ tag }}
            </span>
          </div>
          
        </div>
      </article>
    </main>

    <Footer />

    <!-- Lightbox -->
    <Transition name="lightbox">
      <div
        v-if="lightboxOpen"
        class="lightbox-overlay"
        @click.self="closeLightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="lightboxAlt || 'Image preview'"
      >
        <button class="lightbox-close" @click="closeLightbox" aria-label="Close image preview">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <div class="lightbox-content">
          <img :src="lightboxSrc" :alt="lightboxAlt" class="lightbox-image" />
          <p v-if="lightboxAlt" class="lightbox-caption">{{ lightboxAlt }}</p>
        </div>
      </div>
    </Transition>

    <!-- Scroll to Top Button -->
    <Transition name="scroll-top">
      <button 
        v-if="showScrollTop"
        @click="scrollToTop"
        class="scroll-to-top"
        aria-label="Scroll to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>
    </Transition>
  </div>
</template>

<style scoped>
@media (min-width: 768px) {
  h1 {
    font-size: 4.5rem !important;
  }
  
  .recommended-grid {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}

/* Scroll to Top Button */
.scroll-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  background-color: var(--accent-red);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(242, 72, 73, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;
}

.scroll-to-top:hover {
  background-color: var(--dark-navy);
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(35, 47, 52, 0.4);
}

.scroll-to-top svg {
  width: 24px;
  height: 24px;
}

/* Lightbox */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  backdrop-filter: blur(4px);
}

.lightbox-close {
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  width: 3rem;
  height: 3rem;
  background-color: var(--accent-red);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2001;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.lightbox-close:hover {
  background-color: var(--dark-navy);
  transform: scale(1.1);
}

.lightbox-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 90vw;
  max-height: 90vh;
}

.lightbox-image {
  max-width: 90vw;
  max-height: 82vh;
  object-fit: contain;
  border-radius: 2px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  cursor: default !important;
}

.lightbox-caption {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-align: center;
  margin: 0;
}

/* Lightbox transition */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.25s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-active .lightbox-content,
.lightbox-leave-active .lightbox-content {
  transition: transform 0.25s ease;
}

.lightbox-enter-from .lightbox-content,
.lightbox-leave-to .lightbox-content {
  transform: scale(0.92);
}

/* Transition for scroll to top button */
.scroll-top-enter-active,
.scroll-top-leave-active {
  transition: all 0.3s ease;
}

.scroll-top-enter-from,
.scroll-top-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}
</style>
