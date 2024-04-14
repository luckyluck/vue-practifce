import actions from './actions.js'
import getters from './getters.js'
import mutations from './mutations'

export default {
  state() {
    return {
      token: null,
      userId: null,
      expiresIn: null
    }
  },
  actions,
  getters,
  mutations
}
