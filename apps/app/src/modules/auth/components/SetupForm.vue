<template>
  <div>
    <h2>Создать админа</h2>

    <form @submit.prevent="submit" :class="$style.form">
      <UiField label="Электронная почта" isRequired :error="error('email')">
        <UiInput v-model="formData.email" />
      </UiField>

      <UiField label="Пароль" isRequired :error="error('password')">
        <UiInput v-model="formData.password" type="password" />
      </UiField>

      <UiButton type="submit">Создать</UiButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { UiButton, UiField, UiInput, toast } from 'mhz-ui';
import { ILoginData } from 'fitness-tracker-contracts';

import { useValidator, required, email } from '@/common/composables/useValidate';
import { setup } from '@/auth/services';
import { URL_HOME } from '@/common/constants';

const router = useRouter();

const formData = ref<ILoginData>({
  email: '',
  password: '',
});

const { mutate: mutateSetup } = setup({
  onSuccess: () => {
    toast.success('Админ создан!');
    router.push(URL_HOME);
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
  if (isValid()) mutateSetup(formData.value);
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
