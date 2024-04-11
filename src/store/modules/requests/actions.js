export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await fetch(`https://vue-http-eb1e6-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send request');
    }

    context.commit('addRequest', {
      id: data.name,
      coachId: payload.coachId,
      ...newRequest,
    });
  },
  async loadRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const response = await fetch(`https://vue-http-eb1e6-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=${token}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch request');
    }

    context.commit('setRequests', data ? Object.keys(data).map(id => ({
      id,
      coachId,
      ...data[id],
    })) : []);
  }
};