import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseDialog from '@/components/ui/BaseDialog.vue'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.component('BaseBadge', BaseBadge)
app.component('BaseButton', BaseButton)
app.component('BaseCard', BaseCard)
app.component('BaseDialog', BaseDialog)
app.component('BaseSpinner', BaseSpinner)

app.mount('#app')
