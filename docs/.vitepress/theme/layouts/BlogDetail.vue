<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { data as blogPosts } from '../blog.data'
import { computed } from 'vue'
import Footer from '../components/Footer.vue'

const { frontmatter } = useData()

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
            
            <div style="text-align: left;">
              <p style="font-size: 0.625rem; text-transform: uppercase; font-weight: 700; letter-spacing: 0.1em; color: rgba(35, 47, 52, 0.4); margin: 0 0 0.125rem 0;">Reading Time</p>
              <p style="font-size: 0.875rem; font-weight: 900; color: var(--dark-navy); text-transform: uppercase; margin: 0;">{{ getReadingTime(frontmatter.description) }}</p>
            </div>
          </div>


        </div>


        <!-- Article Content -->
        <div class="article-content">
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
</style>
