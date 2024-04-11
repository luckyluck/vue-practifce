<script>
export default {
  name: 'CoachFilter',
  emits: ['change-filter'],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      }
    };
  },
  methods: {
    setFilter(event) {
      const inputId = event.target.id;
      const isChecked = event.target.checked;

      this.filters = {
        ...this.filters,
        [inputId]: isChecked,
      };
      this.$emit('change-filter', this.filters)
    }
  }
};
</script>

<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option">
      <input type="checkbox" id="frontend" :checked="filters.frontend" @change="setFilter">
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="backend" :checked="filters.backend" @change="setFilter">
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="career" :checked="filters.career" @change="setFilter">
      <label for="career">Career</label>
    </span>
  </base-card>
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