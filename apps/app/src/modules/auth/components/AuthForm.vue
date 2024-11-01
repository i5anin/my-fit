<template>
  <div>
    <h2>{{ props.isSetup ? 'Создать админа' : 'Логин' }}</h2>

    <form @submit.prevent="submit" :class="$style.form">
      <UiField label="Электронная почта" isRequired :error="error('email')">
        <UiInput v-model="formData.email" />
      </UiField>

      <UiField label="Пароль" isRequired :error="error('password')">
        <UiInput v-model="formData.password" type="password" />
      </UiField>

      <UiButton type="submit">{{ props.isSetup ? 'Создать' : 'Войти' }}</UiButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { UiButton, UiField, UiInput, toast } from 'mhz-ui';
import { ILoginData } from 'fitness-tracker-contracts';

import { useAuth } from '@/auth/composables/useAuth';
import { setAuthHeader } from '@/common/plugins/api';
import { useValidator, required, email } from '@/common/composables/useValidate';
import { login, setup } from '@/auth/services';
import { TOKEN_NAME } from '@/auth/constants';
import { URL_HOME } from '@/common/constants';
import { URL_ACTIVITY_CREATE } from '@/activity/constants';

interface IProps {
  isSetup?: boolean;
}

const props = defineProps<IProps>();
const emit = defineEmits(['login']);

const router = useRouter();

const { auth } = useAuth();

const formData = ref<ILoginData>({
  email: '',
  password: '',
});

const { mutate: mutateLogin } = login({
  onSuccess: (user: { token: string }) => {
    toast.success('Добро пожаловать!');
    auth(user.token, setAuthHeader, TOKEN_NAME);

    emit('login');

    router.push(URL_ACTIVITY_CREATE);
  },
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
  if (isValid()) {
    if (props.isSetup) {
      mutateSetup(formData.value);
    } else {
      mutateLogin(formData.value);
    }
  }
}
</script>

<style module lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 300px;
}
</style>
