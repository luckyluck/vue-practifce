<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps(['id', 'firstName', 'lastName', 'rate', 'areas'])

const route = useRoute()

const fullName = computed(() => `${props.firstName} ${props.lastName}`)
const coachContactLink = computed(() => `${route.path}/${props.id}/contact`)
const coachDetailsLink = computed(() => `${route.path}/${props.id}`)
</script>

<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <BaseBadge v-for="area in areas" :key="area" :title="area" :type="area" />
    </div>
    <div class="actions">
      <BaseButton link mode="outline" :to="coachContactLink">Contact</BaseButton>
      <BaseButton link :to="coachDetailsLink">View Details</BaseButton>
    </div>
  </li>
</template>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
