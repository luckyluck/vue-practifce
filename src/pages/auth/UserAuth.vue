<script setup lang="ts">
import { ref, computed } from 'vue'
// @ts-ignore
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import BaseDialog from '@/components/ui/BaseDialog.vue'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const store = useStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const formIsValid = ref(true)
const mode = ref('login')
const isLoading = ref(false)
const error = ref(null)

const submitButtonCaption = computed(() => (mode.value === 'login' ? 'Login' : 'Signup'))
const switchModeButtonCaption = computed(() =>
  mode.value === 'login' ? 'Signup instead' : 'Login instead'
)

function switchAuthMode() {
  mode.value = mode.value === 'login' ? 'signup' : 'login'
}

function handleError() {
  error.value = null
}

async function submitForm() {
  if (!email.value || !email.value.includes('@') || !password.value || password.value.length < 6) {
    formIsValid.value = false
    return
  }

  isLoading.value = true

  try {
    await store.dispatch(mode.value, { email: email.value, password: password.value })

    // TODO verify if it still makes sense after introducing guards
    const redirectUrl = route.query.redirect ?? 'coaches'
    router.replace(`/${redirectUrl}`)
  } catch (e) {
    // @ts-ignore
    error.value = e.message
  }

  isLoading.value = false
}
</script>

<template>
  <div>
    <BaseDialog fixed :show="!!error" title="Error occurred" @close="handleError">
      <p>{{ error }}</p>
    </BaseDialog>
    <base-dialog fixed :show="isLoading" title="Authenticating">
      <BaseSpinner />
    </base-dialog>
    <BaseCard>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="formIsValid">
          Please enter a valid email and password (must be at least 6 characters long).
        </p>
        <BaseButton>{{ submitButtonCaption }}</BaseButton>
        <BaseButton type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</BaseButton>
      </form>
    </BaseCard>
  </div>
</template>

<style scoped>
form {
  margin: 1rem;
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
</style>
