<script setup lang="ts">
</script>

<template>
  <footer style="border-top: 1px solid rgba(35, 47, 52, 0.1); padding: 5rem 1.5rem; background-color: var(--dark-navy); color: var(--cream);">
    <div style="max-width: 1280px; margin: 0 auto; padding: 0 1.5rem;">
      <div style="display: flex; flex-direction: column; justify-content: space-between; align-items: flex-start; gap: 3rem;">
        <!-- Left Side - Logo and Copyright -->
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <img src="/assets/logo.svg" alt="Logo" style="width: 2rem; height: 2rem; color: var(--accent-red);" />
            <p style="font-size: 1.125rem; font-weight: 900; letter-spacing: -0.05em; text-transform: uppercase; margin: 0;">arjanrijsdijk.com</p>
          </div>
          <p style="color: rgba(232, 233, 224, 0.5); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.3em; margin: 0;">
            All things power platform
          </p>
        </div>

        <!-- Right Side - Social Links -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div style="display: flex; gap: 2rem;">
            <a href="https://linkedin.com/in/arjanrijsdijk" target="_blank" style="color: var(--cream); transition: color 0.3s ease; text-decoration: none;" @mouseenter="$event.target.style.color = 'var(--accent-red)'" @mouseleave="$event.target.style.color = 'var(--cream)'">
              <svg style="width: 1.25rem; height: 1.25rem; fill: currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://x.com/arjanrijsdijk" target="_blank" style="color: var(--cream); transition: color 0.3s ease; text-decoration: none;" @mouseenter="$event.target.style.color = 'var(--accent-red)'" @mouseleave="$event.target.style.color = 'var(--cream)'">
              <svg style="width: 1.25rem; height: 1.25rem; fill: currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://github.com/arjanrijsdijk" target="_blank" style="color: var(--cream); transition: color 0.3s ease; text-decoration: none;" @mouseenter="$event.target.style.color = 'var(--accent-red)'" @mouseleave="$event.target.style.color = 'var(--cream)'">
              <svg style="width: 1.25rem; height: 1.25rem; fill: currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://bsky.app/profile/arjanrijsdijk" target="_blank" style="color: var(--cream); transition: color 0.3s ease; text-decoration: none;" @mouseenter="$event.target.style.color = 'var(--accent-red)'" @mouseleave="$event.target.style.color = 'var(--cream)'">
              <svg style="width: 1.25rem; height: 1.25rem; fill: currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@media (min-width: 768px) {
  footer > div > div {
    flex-direction: row !important;
    align-items: center !important;
  }
}
</style>
