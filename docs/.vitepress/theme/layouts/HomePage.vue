<script setup lang="ts">
import { computed } from 'vue'
import { data as blogPosts } from '../blog.data'
import { data as events } from '../events.data'
import { withBase } from 'vitepress'
import Footer from '../components/Footer.vue'

// Get latest 3 blog posts
const latestPosts = computed(() => {
  return blogPosts.slice(0, 3)
})

// Get latest 3 events for timeline
const latestEvents = computed(() => {
  return events.slice(0, 3)
})

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).toUpperCase()
}

function formatSessionDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long',
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
    <section style="position: relative; padding: 6rem 1.5rem 10rem; background-image: url('/assets/aboutme-3.jpg'); background-size: 110%; background-position: right center; background-repeat: no-repeat;">
      <div style="position: absolute; inset: 0; background: rgba(232, 233, 224, 0.75);"></div>
      <div style="position: relative; z-index: 1; max-width: 1280px; margin: 0 auto; padding: 0 1.5rem;">

        <span style="display: inline-block; background-color: rgba(242, 72, 73, 0.1); color: var(--accent-red); font-size: 0.75rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.3em; padding: 0.5rem 1rem; border-radius: 9999px; margin-bottom: 2rem;">
          My Personal Blog
        </span>
        
        <h1 style="color: var(--dark-navy); font-size: 3.75rem; font-weight: 900; line-height: 0.85; letter-spacing: -0.05em; margin-bottom: 2.5rem; max-width: 80rem;">
          All Things<br />Power Platform<br />Blog
        </h1>
        
        <p style="color: rgba(35, 47, 52, 0.7); font-size: 1.25rem; max-width: 42rem; line-height: 1.75; font-weight: 500; margin-bottom: 3rem;">
          Practical tips, demos, and hands-on experiences to help you get more out of the Power Platform
        </p>
        
        <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
          <a 
            href="/blog" 
            style="display: inline-flex; align-items: center; justify-content: center; border-radius: 9999px; height: 4rem; padding: 0 2.5rem; background-color: var(--dark-navy); color: white; font-size: 0.875rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.25em; transition: all 0.3s ease; text-decoration: none; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);"
            @mouseenter="$event.target.style.backgroundColor = 'var(--accent-red)'"
            @mouseleave="$event.target.style.backgroundColor = 'var(--dark-navy)'"
          >
            View blogposts
          </a>
          <a 
            href="/events" 
            style="display: inline-flex; align-items: center; justify-content: center; border-radius: 9999px; height: 4rem; padding: 0 2.5rem; background-color: white; border: 1px solid rgba(35, 47, 52, 0.1); color: var(--dark-navy); font-size: 0.875rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.25em; transition: all 0.3s ease; text-decoration: none;"
            @mouseenter="$event.target.style.borderColor = 'var(--accent-red)'; $event.target.style.color = 'var(--accent-red)'"
            @mouseleave="$event.target.style.borderColor = 'rgba(35, 47, 52, 0.1)'; $event.target.style.color = 'var(--dark-navy)'"
          >
            View Events
          </a>
        </div>
      </div>
    </section>

    <!-- Latest Blog Posts -->
    <section style="padding: 6rem 1.5rem; background-color: rgba(255, 255, 255, 0.3);">
      <div class="container">
        <div style="display: flex; flex-direction: column; justify-content: space-between; align-items: flex-end; gap: 1.5rem; margin-bottom: 4rem;">
          <div style="display: flex; flex-direction: column; gap: 1rem; width: 100%;">
            <p style="color: var(--accent-red); font-size: 0.75rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.4em; margin: 0;">My blogs</p>
            <h2 style="font-size: 2.5rem; font-weight: 900; letter-spacing: -0.05em; margin: 0;">Latest from my blog</h2>
          </div>
          <a 
            href="/blog" 
            style="display: flex; align-items: center; gap: 0.5rem; color: var(--dark-navy); font-weight: 900; text-transform: uppercase; letter-spacing: 0.15em; font-size: 0.75rem; transition: color 0.3s ease; text-decoration: none;"
            @mouseenter="$event.target.style.color = 'var(--accent-red)'"
            @mouseleave="$event.target.style.color = 'var(--dark-navy)'"
          >
            View All Blogposts
            <span class="material-symbols-outlined" style="font-size: 1rem;">arrow_forward</span>
          </a>
        </div>

        <!-- Blog Grid (same as BlogOverview) -->
        <div class="blog-grid">
          <article
            v-for="post in latestPosts"
            :key="post.url"
            class="blog-card"
            @click="navigateToPost(post.url)"
          >
            <div class="blog-card-image card-shadow">
              <div 
                style="width: 100%; height: 100%; background-size: cover; background-position: center; transition: transform 0.7s ease-out;"
                :style="{ backgroundImage: `url(${withBase(post.image)})` }"
              ></div>
              <div style="position: absolute; top: 1.25rem; left: 1.25rem;">
                <span style="background-color: var(--accent-red); color: white; font-size: 0.625rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; padding: 0.375rem 1rem; border-radius: 9999px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);">
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

                <span>{{ formatDate(post.date) }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Events Highlight Timeline -->
    <section style="padding: 8rem 1.5rem; border-top: 1px solid rgba(35, 47, 52, 0.05);">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1fr; gap: 5rem;">
          <!-- Left Column -->
          <div style="display: flex; flex-direction: column; gap: 2rem;">
            <p style="color: var(--accent-red); font-size: 0.75rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.4em; margin: 0;">My Events</p>
            <h2 style="font-size: 2.5rem; font-weight: 900; letter-spacing: -0.05em; line-height: 1.2; margin: 0;">Events & Speaking</h2>
            <p style="color: rgba(35, 47, 52, 0.7); font-size: 1.125rem; line-height: 1.6; max-width: 42rem; margin: 0;">
              Conferences and meetups where I’ve shared my experiences and insights
            </p>
            <div style="padding-top: 1rem;">
              <a 
                href="/events" 
                style="display: inline-flex; align-items: center; justify-content: center; border-radius: 0.75rem; height: 3.5rem; padding: 0 2rem; border: 2px solid var(--dark-navy); color: var(--dark-navy); font-size: 0.75rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; transition: all 0.3s ease; text-decoration: none;"
                @mouseenter="$event.target.style.backgroundColor = 'var(--dark-navy)'; $event.target.style.color = 'white'"
                @mouseleave="$event.target.style.backgroundColor = 'transparent'; $event.target.style.color = 'var(--dark-navy)'"
              >
                Explore Events
              </a>
            </div>
          </div>

          <!-- Right Column - Timeline -->
          <div style="display: flex; flex-direction: column; gap: 0; border-left: 2px solid rgba(35, 47, 52, 0.1); padding-left: 2.5rem; margin-left: 0.5rem;">
            <div 
              v-for="(event, index) in latestEvents" 
              :key="event.url"
              style="position: relative; padding-bottom: 3rem;"
              :style="{ paddingBottom: index === latestEvents.length - 1 ? '0' : '3rem' }"
            >
              <div 
                style="position: absolute; left: -3.25rem; top: 0; width: 1.25rem; height: 1.25rem; border-radius: 9999px; border: 4px solid var(--cream); box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);"
                :style="{ backgroundColor: index === 0 ? 'var(--accent-red)' : index === 1 ? 'var(--dark-navy)' : 'rgba(35, 47, 52, 0.2)' }"
              ></div>
              <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <span style="color: rgba(35, 47, 52, 0.4); font-size: 0.625rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.15em;">
                  {{ formatSessionDate(event.date) }}
                </span>
                <h4 style="font-size: 1.25rem; font-weight: 900; margin: 0;">{{ event.title }}</h4>
                <p style="color: rgba(35, 47, 52, 0.6); font-size: 0.875rem; line-height: 1.75; max-width: 32rem; margin: 0;">
                  {{ event.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

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

@media (min-width: 768px) {
  h1 {
    font-size: 7rem !important;
  }
  
  h2 {
    font-size: 3rem !important;
  }
  
  section:nth-child(3) > div > div:first-child {
    flex-direction: row !important;
  }
  
  section:last-of-type > div > div:first-child {
    grid-template-columns: 5fr 7fr !important;
  }
}

@media (min-width: 1024px) {
  section:last-of-type > div > div:first-child {
    grid-template-columns: 5fr 7fr !important;
  }
}
</style>
