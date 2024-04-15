<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import CoachItem from '@/components/coaches/CoachItem.vue'
import CoachFilter from '@/components/coaches/CoachFilter.vue'
import { useAuthStore, useCoachesStore } from '@/stores'

const coachesStore = useCoachesStore()
const authStore = useAuthStore()

const activeFilters = ref({
  frontend: true,
  backend: true,
  career: true
})
const isLoading = ref(false)
const error = ref(null)

const filteredCoaches = computed(() => {
  const coaches = coachesStore.coaches

  return coaches.filter((coach: any) =>
    // @ts-ignore
    coach.areas.some((area: string) => activeFilters.value[area as any])
  )
})
const hasCoaches = computed(() => coachesStore.hasCoaches)
const isCoach = computed(() => coachesStore.isCoach)
const isLoggedIn = computed(() => authStore.isAuthenticated)
const canRegister = computed(() => isLoggedIn.value && !isCoach.value && !isLoading.value)

function handleError() {
  error.value = null
}
// @ts-ignore
function setFilters(updatedFilters) {
  activeFilters.value = updatedFilters
}

async function loadCoaches(forceRefresh = false) {
  isLoading.value = true

  try {
    await coachesStore.loadCoaches(forceRefresh)
  } catch (e) {
    // @ts-ignore
    error.value = e.message || 'Something went wrong!'
  }

  isLoading.value = false
}

onMounted(() => {
  loadCoaches()
})
</script>

<template>
  <div>
    <BaseDialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </BaseDialog>
    <section>
      <CoachFilter @change-filter="setFilters"></CoachFilter>
    </section>
    <section>
      <BaseCard>
        <div class="controls">
          <BaseButton mode="outline" @click="loadCoaches(true)">Refresh</BaseButton>
          <BaseButton link to="/auth?redirect=register" v-if="!isLoggedIn"
            >Login to Register as a Coach</BaseButton
          >
          <BaseButton link to="/register" v-if="canRegister">Register as Coach</BaseButton>
        </div>
        <div v-if="isLoading">
          <BaseSpinner />
        </div>
        <ul v-else-if="hasCoaches">
          <CoachItem
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          />
        </ul>
        <h3 v-else>No Coaches Found</h3>
      </BaseCard>
    </section>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
