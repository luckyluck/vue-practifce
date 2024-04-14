import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

async function auth(url: string, formBody: Object) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      ...formBody,
      returnSecureToken: true
    })
  })

  const data = await response.json()

  if (!response.ok) {
    sessionStorage.removeItem('auth')
    throw new Error(data.message || 'Failed to authenticate.')
  }

  const { expiresIn, ...restOfData } = data
  const expirationDate = Date.now() + parseInt(expiresIn)

  // TODO implement auto logout
  // TODO implement session extension via Firebase if needed/supported

  sessionStorage.setItem(
    'auth',
    JSON.stringify({
      ...restOfData,
      expirationDate
    })
  )

  return {
    ...restOfData,
    expirationDate
  }
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null)
  const userId = ref(null)
  const expirationDate = ref(null)

  const isAuthenticated = computed(() => !!token.value)

  async function login(payload: Object) {
    const data = await auth(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_FIREBASE_API_KEY}`,
      payload
    )

    token.value = data.idToken
    userId.value = data.localId
    expirationDate.value = data.expirationDate
  }

  async function signup(payload: Object) {
    const data = await auth(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${import.meta.env.VITE_FIREBASE_API_KEY}`,
      payload
    )

    token.value = data.idToken
    userId.value = data.localId
    expirationDate.value = data.expirationDate
  }

  function autoLogin() {
    const auth = sessionStorage.getItem('auth')

    if (auth) {
      const data = JSON.parse(auth)

      token.value = data.idToken
      userId.value = data.localId
      expirationDate.value = data.expirationDate
    }
  }

  function logout() {
    sessionStorage.removeItem('auth')

    token.value = null
    userId.value = null
    expirationDate.value = null
  }

  return { userId, token, isAuthenticated, login, signup, autoLogin, logout }
})
