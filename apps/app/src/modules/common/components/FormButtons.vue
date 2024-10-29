<template>
  <div :class="$style.buttons">
    <div :class="$style.buttonsInner">
      <UiButton type="submit" :isDisabled="props.isLoading" data-test="form-buttons-submit">
        {{ props.id ? 'Обновить' : 'Добавить' }}
      </UiButton>

      <UiButton @click="router.go(-1)" layout="secondary" :isDisabled="props.isLoading" data-test="form-buttons-back">
        Назад
      </UiButton>
    </div>

    <UiButton v-if="props.id" @click="isShowConfirm = true" layout="secondary" :isDisabled="props.isLoading">
      Удалить
    </UiButton>

    <UiModal v-model="isShowConfirm" isConfirm @confirm="emit('delete', props.id)" lang="ru">
      Подтверждаете удаление?
    </UiModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { UiButton, UiModal } from 'mhz-ui';

interface IProps {
  id?: string;
  isLoading?: boolean;
}

const props = defineProps<IProps>();

const emit = defineEmits(['delete']);

const isShowConfirm = ref(false);

const router = useRouter();
</script>

<style module lang="scss">
.buttons {
  display: flex;
  gap: 8px;
  justify-content: space-between;
  width: 100%;
}

.buttonsInner {
  display: flex;
  gap: 16px;
}
</style>
