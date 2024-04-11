export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches?.length > 0;
  },
  isCoach(_, getters, __, rootGetters) {
    const coaches = getters.coaches;
    const { userId } = rootGetters;

    return coaches.some(coach => coach.id === userId);
  },
  shouldUpdate(state) {
    const { lastFetch } = state;

    if (!lastFetch) {
      return true;
    }

    return (Date.now() - lastFetch) > 60 * 1000; // More than a minute ago
  }
};