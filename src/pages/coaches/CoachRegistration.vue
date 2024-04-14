<script setup lang="ts">
// @ts-ignore
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import CoachForm from '@/components/coaches/CoachForm.vue'
import BaseCard from '@/components/ui/BaseCard.vue'

const store = useStore()
const router = useRouter()

// @ts-ignore
function saveData(data) {
  store.dispatch('coaches/registerCoach', data)

  router.replace('/coaches')
}
</script>

<template>
  <section>
    <BaseCard>
      <h2>Register as a Coach</h2>
      <CoachForm @save-data="saveData"></CoachForm>
    </BaseCard>
  </section>
</template>

<style scoped></style>
