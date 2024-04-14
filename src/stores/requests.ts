import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

interface Request {
  id: string
  coachId: string
  userEmail: string
  message: string
}

export const useRequestsStore = defineStore('requests', () => {
  const auth = useAuthStore()

  const _requests = ref<Request[]>([])

  const requests = computed(() => {
    return _requests.value.filter((request) => request.coachId === auth.userId)
  })
  const hasRequests = computed(() => requests.value.length > 0)

  async function contactCoach(email: string, message: string, coachId: string) {
    const newRequest = {
      userEmail: email,
      message: message
    }

    const response = await fetch(
      `https://vue-http-eb1e6-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest)
      }
    )
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send request')
    }

    _requests.value.push({
      id: data.name,
      coachId: coachId,
      ...newRequest
    })
  }

  async function loadRequests() {
    const response = await fetch(
      `https://vue-http-eb1e6-default-rtdb.europe-west1.firebasedatabase.app/requests/${auth.userId}.json?auth=${auth.token}`
    )
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch request')
    }

    _requests.value = data
      ? Object.keys(data).map((id) => ({
          id,
          coachId: auth.userId,
          ...data[id]
        }))
      : []
  }

  return { requests, hasRequests, contactCoach, loadRequests }
})
