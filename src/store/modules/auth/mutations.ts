export default {
  // @ts-ignore
  setUser(state, payload) {
    state.token = payload.idToken
    state.userId = payload.localId
    state.expirationDate = payload.expirationDate
  },
  // @ts-ignore
  unsetUser(state) {
    state.token = null
    state.userId = null
    state.expirationDate = null
  }
}
