export default {
  requests(state, _, __, rootGetters) {
    return state.requests.filter(request => request.coachId === rootGetters.userId);
  },
  hasRequests(_, getters) {
    return getters.requests?.length > 0;
  }
};