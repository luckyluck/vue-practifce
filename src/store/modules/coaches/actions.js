export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const response = await fetch(`https://vue-http-eb1e6-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to register a coach');
    }

    context.commit('registerCoach', {
      ...payload,
      id: userId,
    });
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(`https://vue-http-eb1e6-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch coaches');
    }

    context.commit('setCoaches', data ? Object.keys(data).map(id => ({
      id,
      ...data[id],
    })) : []);
    context.commit('setFetchTimestamp');
  }
};