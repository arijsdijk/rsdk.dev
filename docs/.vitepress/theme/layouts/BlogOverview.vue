<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { data as blogPosts } from '../blog.data'
import { withBase } from 'vitepress'
import Footer from '../components/Footer.vue'

const selectedTag = ref('All Posts')

// Read tag from URL query parameter on mount
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const tagParam = urlParams.get('tag')
  if (tagParam) {
    selectedTag.value = tagParam
    currentPage.value = 1
  }
})
const postsPerPage = 6
const currentPage = ref(1)

// Get all unique tags from blog posts
const allTags = computed(() => {
  const tags = new Set<string>(['All Posts'])
  blogPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags)
})

// Filter posts by selected tag
const filteredPosts = computed(() => {
  if (selectedTag.value === 'All Posts') {
    return blogPosts
  }
  return blogPosts.filter(post => 
    post.tags.includes(selectedTag.value)
  )
})

// Paginate filtered posts
const visiblePosts = computed(() => {
  const endIndex = currentPage.value * postsPerPage
  return filteredPosts.value.slice(0, endIndex)
})

const hasMore = computed(() => {
  return visiblePosts.value.length < filteredPosts.value.length
})

function loadMore() {
  currentPage.value++
}

function selectTag(tag: string) {
  selectedTag.value = tag
  currentPage.value = 1
}

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
  return `${minutes} MIN READ`
}

function getCategoryFromTags(tags: string[]) {
  return tags[0] || 'General'
}

function navigateToPost(url: string) {
  window.location.href = withBase(url)
}
</script>

<template>
  <div class="custom-layout">
    <!-- Hero Section -->
    <main class="container" style="padding-top: 5rem; padding-bottom: 5rem;">
      <div style="display: flex; flex-direction: column; gap: 2rem; margin-bottom: 5rem;">
        <h1 style="color: var(--dark-navy); font-size: 6rem; font-weight: 900; line-height: 0.9; letter-spacing: -0.05em;">
          Blog Archive
        </h1>
        <p style="color: rgba(35, 47, 52, 0.8); font-size: 1.5rem; max-width: 48rem; line-height: 1.6; font-weight: 500;">
          A curated collection of thoughts on Power Platform, development tools, and modern business solutions.
        </p>
      </div>

      <!-- Tag Filter -->
      <div style="display: flex; gap: 1rem; margin-bottom: 4rem; flex-wrap: wrap; align-items: center;">
        <div
          v-for="tag in allTags"
          :key="tag"
          :class="['tag-pill', selectedTag === tag ? 'active' : 'inactive']"
          @click="selectTag(tag)"
        >
          <p style="margin: 0;">{{ tag }}</p>
        </div>
      </div>

      <!-- Blog Grid -->
      <div class="blog-grid">
        <article
          v-for="post in visiblePosts"
          :key="post.url"
          class="blog-card"
          @click="navigateToPost(post.url)"
        >
          <div class="blog-card-image card-shadow">
            <div 
              style="width: 100%; height: 100%; background-size: cover; background-position: center; transition: transform 0.7s ease-out;"
              :style="{ backgroundImage: `url(${withBase(post.image)})` }"
            ></div>

            <div style="position: absolute; top: 1rem; left: 1rem;">
              <span style="background-color: var(--accent-red); color: white; font-size: 0.625rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; padding: 0.375rem 1rem; border-radius: 9999px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);">
                <!-- {{ getCategoryFromTags(post.tags) }} -->
                {{ post.subtitle }}
              </span>
            </div>

          </div>
          
          <div style="display: flex; flex-direction: column; gap: 1rem; padding: 0 0.5rem;">
            <h3 style="color: var(--dark-navy); font-size: 1.5rem; font-weight: 900; line-height: 1.2; margin: 0; transition: color 0.3s ease;">
              {{ post.title }}
            </h3>
            <p class="line-clamp-3" style="color: rgba(35, 47, 52, 0.7); font-size: 1rem; font-weight: 500; line-height: 1.6; margin: 0;">
              {{ post.description }}
            </p>
            <div style="display: flex; align-items: center; gap: 1rem; margin-top: 0.5rem; color: rgba(35, 47, 52, 0.5); font-size: 0.625rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em;">
              
              <!--
              <span style="display: flex; align-items: center; gap: 0.375rem;">
                {{ post.author }}
              </span>
              -->

              <span>{{ formatDate(post.date) }}</span>
            </div>
          </div>
        </article>
      </div>

      <!-- Load More Button -->
      <div v-if="hasMore" style="display: flex; padding-top: 6rem; padding-bottom: 3rem; justify-content: center;">
        <button class="btn-primary" @click="loadMore">
          <span>Load More Articles</span>
        </button>
      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.blog-card:hover h3 {
  color: var(--accent-red);
}

.blog-card:hover .blog-card-image > div {
  transform: scale(1.05);
}
</style>
