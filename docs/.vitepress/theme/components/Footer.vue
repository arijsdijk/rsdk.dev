<script setup lang="ts">
</script>

<template>
  <footer style="border-top: 1px solid rgba(35, 47, 52, 0.1); padding: 6rem 1.5rem; background-color: var(--dark-navy); color: var(--cream);">
    <div class="container">
      <div style="display: flex; flex-direction: column; gap: 4rem; align-items: flex-start;">
        <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 32rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 2rem; height: 2rem; color: var(--dark-navy); background-color: var(--cream); border-radius: 0.25rem; display: flex; align-items: center; justify-content: center;">
              <svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 3H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H14C16.2091 21 18 19.2091 18 17V7L16 3Z" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </div>
            <p style="font-size: 1.5rem; font-weight: 900; letter-spacing: -0.05em; text-transform: uppercase; margin: 0;">rsdk.dev</p>
          </div>
          <p style="color: rgba(232, 233, 224, 0.6); font-size: 1rem; line-height: 1.6; margin: 0;">
            Exploring the intersections of Power Platform and modern development. A digital space for sharing knowledge and experiences.
          </p>
          <p style="color: rgba(232, 233, 224, 0.4); font-size: 0.625rem; text-transform: uppercase; font-weight: 900; letter-spacing: 0.3em; margin: 0;">
            © 2026 rsdk.dev
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.container {
  max-width: 1280px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .container {
    padding-left: 5rem;
    padding-right: 5rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding-left: 10rem;
    padding-right: 10rem;
  }
}
</style>
