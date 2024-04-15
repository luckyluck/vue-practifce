<script setup lang="ts">
import { ref, reactive, defineEmits } from 'vue'

const emit = defineEmits(['save-data'])
const firstName = reactive({ value: '', isValid: true })
const lastName = reactive({ value: '', isValid: true })
const description = reactive({ value: '', isValid: true })
const rate = reactive({ value: null, isValid: true })
const areas = reactive({ value: [], isValid: true })
const isFormValid = ref(true)

function clearValidity(input: { value: null | string | number | string[]; isValid: boolean }) {
  input.isValid = true
}

function validateForm() {
  firstName.isValid = firstName.value !== ''
  lastName.isValid = lastName.value !== ''
  description.isValid = description.value !== ''
  rate.isValid = Number.isInteger(rate.value) && (rate.value ?? 0) > 0
  areas.isValid = areas.value.length > 0

  isFormValid.value =
    firstName.isValid && firstName.isValid && description.isValid && rate.isValid && areas.isValid
}

function submitForm() {
  validateForm()

  if (!isFormValid.value) {
    return
  }

  const formData = {
    firstName: firstName.value,
    lastName: lastName.value,
    description: description.value,
    hourlyRate: rate.value,
    areas: areas.value
  }

  emit('save-data', formData)
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">Firstname</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstName.value"
        @blur="clearValidity(firstName)"
      />
      <p v-if="!firstName.isValid">Firstname must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">Lastname</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="lastName.value"
        @blur="clearValidity(lastName)"
      />
      <p v-if="!lastName.isValid">Lastname must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.value"
        @blur="clearValidity(description)"
      ></textarea>
      <p v-if="!description.isValid">Description must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate" v-model.number="rate.value" @blur="clearValidity(rate)" />
      <p v-if="!rate.isValid">Rate must not be empty and greater than zero.</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.value"
          @blur="clearValidity(areas)"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.value"
          @blur="clearValidity(areas)"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.value"
          @blur="clearValidity(areas)"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!areas.isValid">At least one expertise must be selected.</p>
    </div>
    <p v-if="!isFormValid">Please fix the above errors and submit again</p>
    <BaseButton>Register</BaseButton>
  </form>
</template>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
