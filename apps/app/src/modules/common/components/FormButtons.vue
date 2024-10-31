<template>
  <UiFlex justify="space-between">
    <UiFlex gap="16" shrink>
      <UiButton type="submit" :isDisabled="props.isLoading">
        {{ props.id ? 'Обновить' : 'Добавить' }}
      </UiButton>

      <UiButton @click="router.go(-1)" layout="secondary" :isDisabled="props.isLoading">Назад</UiButton>
    </UiFlex>

    <UiButton v-if="props.id" @click="isShowConfirm = true" layout="secondary" :isDisabled="props.isLoading">
      Удалить
    </UiButton>

    <UiModal v-model="isShowConfirm" isConfirm @confirm="emit('delete', props.id)" lang="ru">
      Подтверждаете удаление?
    </UiModal>
  </UiFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { UiButton, UiFlex, UiModal } from 'mhz-ui';

interface IProps {
  id?: string;
  isLoading?: boolean;
}

const props = defineProps<IProps>();

const emit = defineEmits(['delete']);

const isShowConfirm = ref(false);

const router = useRouter();
</script>
