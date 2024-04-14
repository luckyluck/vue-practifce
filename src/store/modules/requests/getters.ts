export default {
  // @ts-ignore
  requests(state, _, __, rootGetters) {
    // @ts-ignore
    return state.requests.filter((request) => request.coachId === rootGetters.userId)
  },
  // @ts-ignore
  hasRequests(_, getters) {
    return getters.requests?.length > 0
  }
}
