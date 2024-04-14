// @ts-ignore
import { createStore } from 'vuex'

import auth from '@/store/modules/auth'
import coaches from '@/store/modules/coaches'
import requests from '@/store/modules/requests'

const store = createStore({
  modules: {
    auth,
    coaches,
    requests
  }
})

export default store
