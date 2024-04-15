<script setup lang="ts">
import { defineProps, computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { type Coach, useCoachesStore } from '@/stores'

const coachesStore = useCoachesStore()
const route = useRoute()

const props = defineProps(['id'])
const selectedCoach = ref<Coach | undefined>(undefined)

const fullName = computed(
  () => `${selectedCoach.value?.firstName} ${selectedCoach.value?.lastName}`
)
const coachContactLink = computed(() => `${route.path}/${props.id}/contact`)
const areas = computed(() => selectedCoach.value?.areas)
const rate = computed(() => selectedCoach.value?.hourlyRate)
const description = computed(() => selectedCoach.value?.description)

onMounted(() => {
  selectedCoach.value = coachesStore.coaches.find((coach) => coach.id === props.id)
})
</script>

<template>
  <div>
    <section>
      <BaseCard>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <header>
          <h2>Interested? Reach out now!</h2>
          <BaseButton link :to="coachContactLink">Contact</BaseButton>
        </header>
        <router-view></router-view>
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <BaseBadge v-for="area in areas" :key="area" :title="area" :type="area" />
        <p>{{ description }}</p>
      </BaseCard>
    </section>
  </div>
</template>
