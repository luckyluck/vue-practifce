export default {
  // @ts-ignore
  registerCoach(state, payload) {
    state.coaches.push(payload)
  },
  // @ts-ignore
  setCoaches(state, payload) {
    state.coaches = payload
  },
  // @ts-ignore
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime()
  }
}
