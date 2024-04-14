export default {
  // @ts-ignore
  coaches(state) {
    return state.coaches
  },
  // @ts-ignore
  hasCoaches(state) {
    return state.coaches?.length > 0
  },
  // @ts-ignore
  isCoach(_, getters, __, rootGetters) {
    const coaches = getters.coaches
    const { userId } = rootGetters

    // @ts-ignore
    return coaches.some((coach) => coach.id === userId)
  },
  // @ts-ignore
  shouldUpdate(state) {
    const { lastFetch } = state

    if (!lastFetch) {
      return true
    }

    return Date.now() - lastFetch > 60 * 1000 // More than a minute ago
  }
}
