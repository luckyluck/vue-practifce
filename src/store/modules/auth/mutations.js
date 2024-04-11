export default {
  setUser(state, payload) {
    state.token = payload.idToken;
    state.userId = payload.localId;
    state.expirationDate = payload.expirationDate;
  },
  unsetUser(state) {
    state.token = null;
    state.userId = null;
    state.expirationDate = null;
  }
};