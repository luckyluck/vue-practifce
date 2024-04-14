export default {
  // @ts-ignore
  userId(state) {
    return state.userId
  },
  // @ts-ignore
  token(state) {
    return state.token
  },
  // @ts-ignore
  isAuthenticated(state) {
    return !!state.token
  }
}
