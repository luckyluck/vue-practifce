import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

export type Area = 'frontend' | 'backend' | 'career'
export interface Coach {
  id: string
  firstName: string
  lastName: string
  areas: Area[]
  description: string
  hourlyRate: number
}

export const useCoachesStore = defineStore('coaches', () => {
  const auth = useAuthStore()

  const lastFetch = ref(0)
  const coaches = ref<Coach[]>([
    {
      id: 'c1',
      firstName: 'Maximilian',
      lastName: 'Schwarzmüller',
      areas: ['frontend', 'backend', 'career'],
      description:
        "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
      hourlyRate: 30
    },
    {
      id: 'c2',
      firstName: 'Julie',
      lastName: 'Jones',
      areas: ['frontend', 'career'],
      description:
        'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
      hourlyRate: 30
    }
  ])

  const hasCoaches = computed(() => coaches.value?.length > 0)
  const isCoach = computed(() => {
    const userId = auth.userId

    return coaches.value.some((coach) => coach.id === userId)
  })
  const shouldUpdate = computed(() => {
    if (!lastFetch.value) {
      return true
    }

    return Date.now() - lastFetch.value > 60 * 1000 // More than a minute ago
  })

  async function registerCoach(payload: any) {
    const userId = auth.userId
    const token = auth.token

    const response = await fetch(
      `https://vue-http-eb1e6-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(payload)
      }
    )
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to register a coach')
    }

    coaches.value.push({
      ...payload,
      id: userId
    })
  }

  async function loadCoaches(forceRefresh = false) {
    if (!forceRefresh && !shouldUpdate.value) {
      return
    }

    const response = await fetch(
      `https://vue-http-eb1e6-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`
    )
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch coaches')
    }

    coaches.value = data
      ? Object.keys(data).map((id) => ({
          id,
          ...data[id]
        }))
      : []
    lastFetch.value = new Date().getTime()
  }

  return { coaches, hasCoaches, isCoach, shouldUpdate, registerCoach, loadCoaches }
})
