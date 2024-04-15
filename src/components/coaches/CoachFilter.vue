<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['change-filter'])

const filters = ref({
  frontend: true,
  backend: true,
  career: true
})

// @ts-ignore
function setFilter(event) {
  const inputId = event.target.id
  const isChecked = event.target.checked

  filters.value = {
    ...filters.value,
    [inputId]: isChecked
  }
  emit('change-filter', filters.value)
}
</script>

<template>
  <BaseCard>
    <h2>Find Your Coach</h2>
    <span class="filter-option">
      <input type="checkbox" id="frontend" :checked="filters.frontend" @change="setFilter" />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="backend" :checked="filters.backend" @change="setFilter" />
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="career" :checked="filters.career" @change="setFilter" />
      <label for="career">Career</label>
    </span>
  </BaseCard>
</template>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
