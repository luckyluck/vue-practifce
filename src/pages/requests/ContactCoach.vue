<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// @ts-ignore
import { useStore } from 'vuex'

import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()
const route = useRoute()
const store = useStore()

const email = ref('')
const message = ref('')
const isFormValid = ref(true)

function submitForm() {
  isFormValid.value = true

  if (email.value === '' || !email.value.includes('@') || message.value === '') {
    isFormValid.value = false

    return
  }

  store.dispatch('requests/contactCoach', {
    // Another approach is to set props: true on router
    coachId: route.params.id,
    email: email.value,
    message: message.value
  })

  router.replace('/coaches')
}
</script>

<template>
  <section>
    <BaseCard>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Your E-mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="message">Message</label>
          <textarea rows="5" id="message" v-model.trim="message"></textarea>
        </div>
        <p class="errors" v-if="!isFormValid">Please enter a valid email and non-empty message</p>
        <div class="actions">
          <BaseButton>Send Message</BaseButton>
        </div>
      </form>
    </BaseCard>
  </section>
</template>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
