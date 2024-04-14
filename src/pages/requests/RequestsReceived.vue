<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
// @ts-ignore
import { useStore } from 'vuex'

import RequestItem from '@/components/requests/RequestItem.vue'
import BaseDialog from '@/components/ui/BaseDialog.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'

const store = useStore()

const isLoading = ref(false)
const error = ref(null)

const receivedRequests = computed(() => store.getters['requests/requests'])
const hasRequests = computed(() => store.getters['requests/hasRequests'])

function handleError() {
  error.value = null
}
async function loadRequests() {
  isLoading.value = true

  try {
    await store.dispatch('requests/loadRequests')
  } catch (e) {
    // @ts-ignore
    error.value = e.message || 'Something went wrong!'
  }

  isLoading.value = false
}

onMounted(() => {
  loadRequests()
})
</script>

<template>
  <div>
    <BaseDialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </BaseDialog>
    <section>
      <BaseCard>
        <header>
          <h2>Requests Received</h2>
        </header>
        <div v-if="isLoading">
          <BaseSpinner />
        </div>
        <ul v-else-if="hasRequests">
          <RequestItem
            v-for="request in receivedRequests"
            :email="request.userEmail"
            :message="request.message"
            :key="request.id"
          ></RequestItem>
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
      </BaseCard>
    </section>
  </div>
</template>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
