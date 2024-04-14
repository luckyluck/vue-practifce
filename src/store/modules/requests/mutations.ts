export default {
  // @ts-ignore
  addRequest(state, payload) {
    state.requests.push(payload)
  },
  // @ts-ignore
  setRequests(state, payload) {
    state.requests = payload
  }
}
