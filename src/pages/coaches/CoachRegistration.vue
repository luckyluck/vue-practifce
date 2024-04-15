<script setup lang="ts">
import { useRouter } from 'vue-router'

import CoachForm from '@/components/coaches/CoachForm.vue'
import { useCoachesStore } from '@/stores'

const coachesStore = useCoachesStore()
const router = useRouter()

function saveData(data: Object) {
  coachesStore.registerCoach(data)

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
