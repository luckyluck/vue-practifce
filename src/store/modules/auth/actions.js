export default {
  async auth(context, { url, ...formBody }) {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        ...formBody,
        returnSecureToken: true,
      })
    });

    const data = await response.json();

    if (!response.ok) {
      sessionStorage.removeItem('auth');
      throw new Error(data.message || 'Failed to authenticate.');
    }

    const { expiresIn, ...restOfData } = data;
    const expirationDate = Date.now() + parseInt(expiresIn);

    // TODO implement auto logout
    // TODO implement session extension via Firebase if needed/supported

    sessionStorage.setItem('auth', JSON.stringify({
      ...restOfData,
      expirationDate,
    }));

    context.commit('setUser', data);
  },
  async login(context, payload) {
    await context.dispatch('auth', { ...payload, url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FIREBASE_API_KEY}` });
  },
  async signup(context, payload) {
    await context.dispatch('auth', { ...payload, url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FIREBASE_API_KEY}` });
  },
  autoLogin(context) {
    const auth = sessionStorage.getItem('auth');

    if (auth) {
      context.commit('setUser', JSON.parse(auth));
    }
  },
  logout(context) {
    sessionStorage.removeItem('auth');
    context.commit('unsetUser');
  }
};