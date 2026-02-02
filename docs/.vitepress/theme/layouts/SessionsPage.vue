<script setup lang="ts">
import { computed } from 'vue'
import { data as sessions } from '../sessions.data'
import Footer from '../components/Footer.vue'

// Group sessions by year-month
const groupedSessions = computed(() => {
  const groups: { [key: string]: typeof sessions } = {}
  
  sessions.forEach(session => {
    const date = new Date(session.date)
    const monthYear = date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    })
    
    if (!groups[monthYear]) {
      groups[monthYear] = []
    }
    groups[monthYear].push(session)
  })
  
  return groups
})

// Get ordered month-year keys
const orderedKeys = computed(() => {
  return Object.keys(groupedSessions.value).sort((a, b) => {
    const dateA = new Date(a)
    const dateB = new Date(b)
    return dateB.getTime() - dateA.getTime()
  })
})

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  }).toUpperCase()
}

function navigateToSession(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div class="custom-layout">
    <main style="flex: 1; padding: 6rem 1.5rem 4rem; background-color: var(--cream);">
      <!-- Hero Section -->
      <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 5rem; max-width: 1280px; margin-left: auto; margin-right: auto; padding: 0 1.5rem; text-align: center; align-items: center;">
        <h1 style="color: var(--dark-navy); font-size: 3.75rem; font-weight: 900; line-height: 0.9; letter-spacing: -0.05em;">
          Sessions
        </h1>
        <p style="color: rgba(35, 47, 52, 0.7); font-size: 1.25rem; max-width: 42rem; line-height: 1.75;">
          A chronological journey through collaborative milestones, design critiques, and technical workshops.
        </p>
      </div>

      <!-- Timeline -->
      <div style="position: relative; max-width: 1280px; margin-left: auto; margin-right: auto; padding: 0 1.5rem;">
        <!-- Vertical Line -->
        <div class="timeline-line" style="position: absolute; left: 1rem; top: 0; bottom: 0; width: 2px; background-color: var(--dark-navy); transform: translateX(-50%); opacity: 1;"></div>

        <!-- Timeline Items -->
        <div style="display: flex; flex-direction: column; gap: 4rem; position: relative;">
          <template v-for="(monthYear, index) in orderedKeys" :key="monthYear">
            <template v-for="(session, sessionIndex) in groupedSessions[monthYear]" :key="session.url">
              <!-- Timeline Item -->
              <div 
                class="timeline-item"
                :class="(index + sessionIndex) % 2 === 0 ? 'timeline-left' : 'timeline-right'"
                style="position: relative; display: flex; flex-direction: column; align-items: flex-start;"
              >
                <!-- Date Label - Desktop only, vertically centered -->
                <div class="date-label" style="display: none;">
                  <span style="color: rgba(35, 47, 52, 0.4); font-size: 0.875rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em;">
                    {{ formatDate(session.date) }}
                  </span>
                </div>

                <!-- Timeline Dot -->
                <div class="timeline-dot" style="position: absolute; left: 1rem; top: 50%; width: 1rem; height: 1rem; border-radius: 9999px; background-color: var(--accent-red); border: 4px solid var(--cream); transform: translate(-50%, -50%); z-index: 10;"></div>

                <!-- Content Card -->
                <div class="card-wrapper" style="width: 100%; padding-left: 3rem;">
                  <div 
                    class="session-card"
                    style="background-color: white; padding: 2rem; border-radius: 0.5rem; border: 1px solid rgba(35, 47, 52, 0.05); transition: all 0.3s ease; cursor: pointer;"
                    @click="navigateToSession(session.link)"
                    @mouseenter="$event.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)'"
                    @mouseleave="$event.currentTarget.style.boxShadow = 'none'"
                  >
                    <!-- Mobile Date -->
                    <div class="mobile-date" style="margin-bottom: 1rem;">
                      <span style="color: rgba(35, 47, 52, 0.4); font-size: 0.75rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.15em;">
                        {{ formatDate(session.date) }}
                      </span>
                    </div>

                    <h3 style="color: var(--dark-navy); font-size: 1.5rem; font-weight: 900; margin-bottom: 0.75rem; line-height: 1.2;">
                      {{ session.title }}
                    </h3>
                    
                    <!-- Event, Location, and Date -->
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; font-size: 0.875rem;">

                      <div style="display: flex; align-items: center; gap: 0.5rem; color: rgba(35, 47, 52, 0.6);">
                        <span class="material-symbols-outlined" style="font-size: 1.25rem;">calendar_today</span>
                        <span>{{ new Date(session.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
                      </div>

                      <div style="display: flex; align-items: center; gap: 0.5rem; color: rgba(35, 47, 52, 0.6);">
                        <span class="material-symbols-outlined" style="font-size: 1.25rem;">location_on</span>
                        <span>{{ session.location }}</span>
                      </div>

                    </div>

                    <p style="color: rgba(35, 47, 52, 0.7); font-size: 1rem; line-height: 1.75; margin-bottom: 1.5rem;">
                      {{ session.description }}
                    </p>

                    <a 
                      :href="session.link"
                      target="_blank"
                      style="display: inline-flex; align-items: center; color: var(--accent-red); font-weight: 900; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.15em; transition: gap 0.3s ease; gap: 0.25rem;"
                      @click.stop
                    >
                      Read More 
                      <span class="material-symbols-outlined" style="font-size: 1.125rem;">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </div>
            </template>
          </template>
        </div>
      </div>

      <!-- View Previous Years Button -->
      <div style="display: flex; padding: 6rem 1rem; justify-content: center;">
        <button 
          style="display: flex; min-width: 240px; cursor: pointer; align-items: center; justify-content: center; height: 3.5rem; padding: 0 2.5rem; background-color: var(--dark-navy); color: white; font-size: 0.875rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; transition: all 0.3s ease; border: none;"
          @mouseenter="$event.target.style.backgroundColor = 'var(--accent-red)'; $event.target.style.transform = 'translateY(-4px)'"
          @mouseleave="$event.target.style.backgroundColor = 'var(--dark-navy)'; $event.target.style.transform = 'translateY(0)'"
        >
          <span>View Previous Years</span>
        </button>
      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
@media (min-width: 768px) {
  h1 {
    font-size: 6rem !important;
  }
  
  /* Match blog container padding */
  main > div:first-child {
    padding: 0 5rem !important;
  }
  
  main > div:nth-child(2) {
    padding: 0 5rem !important;
  }
  
  /* Desktop: Center the timeline line */
  .timeline-line {
    left: 50% !important;
  }
  
  /* Desktop: Timeline items layout */
  .timeline-item {
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-between !important;
  }
  
  /* Left-side items (even) */
  .timeline-left {
    flex-direction: row !important;
  }
  
  .timeline-left .date-label {
    display: block !important;
    width: 45%;
    text-align: right;
    padding-right: 3rem;
  }
  
  .timeline-left .timeline-dot {
    left: 50% !important;
  }
  
  .timeline-left .card-wrapper {
    width: 45% !important;
    padding-left: 0 !important;
  }
  
  /* Right-side items (odd) */
  .timeline-right {
    flex-direction: row-reverse !important;
  }
  
  .timeline-right .date-label {
    display: block !important;
    width: 45%;
    text-align: left;
    padding-left: 3rem;
  }
  
  .timeline-right .timeline-dot {
    left: 50% !important;
  }
  
  .timeline-right .card-wrapper {
    width: 45% !important;
    padding-left: 0 !important;
  }
  
  /* Hide mobile date on desktop */
  .mobile-date {
    display: none !important;
  }
}

@media (min-width: 1024px) {
  main > div:first-child {
    padding: 0 10rem !important;
  }
  
  main > div:nth-child(2) {
    padding: 0 10rem !important;
  }
}
</style>
