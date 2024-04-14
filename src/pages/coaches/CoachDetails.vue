<script setup lang="ts">
import { defineProps, computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// @ts-ignore
import { useStore } from 'vuex'

import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'

const store = useStore()
const route = useRoute()

const props = defineProps(['id'])
const selectedCoach = ref(null)

const fullName = computed(
  // @ts-ignore
  () => `${selectedCoach.value?.firstName} ${selectedCoach.value?.lastName}`
)
const coachContactLink = computed(() => `${route.path}/${props.id}/contact`)
// @ts-ignore
const areas = computed(() => selectedCoach.value?.areas)
// @ts-ignore
const rate = computed(() => selectedCoach.value?.hourlyRate)
// @ts-ignore
const description = computed(() => selectedCoach.value?.description)

onMounted(() => {
  // @ts-ignore
  selectedCoach.value = store.getters['coaches/coaches'].find((coach) => coach.id === props.id)
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
