<template>
  <div>
    <h2>Login</h2>

    <form @submit.prevent="submit" :class="$style.form">
      <UiField label="E-mail" isRequired :error="error('email')">
        <UiInput v-model="formData.email" />
      </UiField>

      <UiField label="Password" isRequired :error="error('password')">
        <UiInput v-model="formData.password" type="password" />
      </UiField>

      <UiButton type="submit">Submit</UiButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import { UiButton, UiField, UiInput, toast } from 'mhz-ui';
import { ILoginData } from 'fitness-tracker-contracts';
import { useAuth } from '@/common/composables/useAuth';
import { setAuthHeader } from '@/common/plugins/api';
import { useValidator, required, email } from '@/common/composables/useValidate';

import { login } from '@/auth/services';
import { TOKEN_NAME } from '@/auth/constants';
import { URL_USER } from '@/user/constants';

const { auth } = useAuth();

const formData = ref<ILoginData>({
  email: '',
  password: '',
  role: 'admin',
});

const { mutate: mutateLogin } = login({
  onSuccess: (user: { token: string }) => {
    auth(user.token, URL_USER, setAuthHeader, TOKEN_NAME);
    toast.success('Welcome!');
  },
});

const rules = computed(() => {
  return {
    email: [required, email],
    password: required,
  };
});

const { error, isValid } = useValidator(formData, rules);

function submit() {
  if (isValid()) mutateLogin(formData.value);
}
</script>

<style module lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 300px;
}
</style>
