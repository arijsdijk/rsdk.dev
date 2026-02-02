<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { data as blogPosts } from '../blog.data'
import { computed, onMounted, ref, onUnmounted } from 'vue'
import Footer from '../components/Footer.vue'

const { frontmatter, page } = useData()

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
  // Wait for content to render, then extract headings
  setTimeout(() => {
    const contentEl = document.querySelector('.article-content')
    if (contentEl) {
      const headings = contentEl.querySelectorAll('h2, h3')
      domHeaders.value = Array.from(headings).map(h => ({
        title: h.textContent?.replace(/^#\s*/, '') || '',
        link: '#' + h.id,
        level: parseInt(h.tagName.substring(1))
      }))
    }
  }, 100)
  
  // Add scroll listener
  window.addEventListener('scroll', handleScroll)
})

// Cleanup on unmount
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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
