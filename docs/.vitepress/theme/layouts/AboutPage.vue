<script setup lang="ts">
import { useData } from 'vitepress'
import Footer from '../components/Footer.vue'

const { frontmatter } = useData()
</script>

<template>
  <div class="custom-layout">
    <main style="flex: 1; padding: 6rem 1.5rem; background-color: var(--cream); display: flex; justify-content: center;">
      <div style="max-width: 768px; width: 100%; display: flex; flex-direction: column; align-items: center; text-align: center;">
        
        <!-- Profile Image -->
        <div style="position: relative; margin-bottom: 3rem;">
          <div style="position: absolute; inset: 0; border-radius: 9999px; border: 2px solid var(--dark-navy); transform: translate(0.5rem, 0.5rem); z-index: -1;"></div>
          <div style="width: 18rem; height: 18rem; border-radius: 9999px; overflow: hidden; border: 2px solid var(--dark-navy); background-color: white;">
            <img 
              src="/assets/aboutme.png"
              alt="Arjan Rijsdijk" 
              style="width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%); transition: all 0.7s ease;"
              @mouseenter="$event.target.style.filter = 'grayscale(0%)'"
              @mouseleave="$event.target.style.filter = 'grayscale(100%)'"
            />
          </div>
        </div>

        <!-- Title -->
        <h1 style="font-size: 3rem; line-height: 1; margin-bottom: 2rem; color: var(--dark-navy); max-width: 42rem; font-weight: 900; letter-spacing: -0.05em;">
          {{ frontmatter.title }}
        </h1>


        <div class="article-content">
          <Content />
        </div>        


      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
@media (min-width: 768px) {
  h1 {
    font-size: 4.5rem !important;
  }
  
  form > div:first-child {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  
  button[type="submit"] {
    width: auto !important;
  }
}

input::placeholder,
textarea::placeholder {
  color: rgba(35, 47, 52, 0.3);
}

input:focus,
textarea:focus {
  outline: none;
}
</style>
