<template>
  <div :class="$style.page">
    <div>Дата занятия: {{ formatDateTime(activity?.dateCreated) }}</div>

    <div>
      Упражнения:<br />
      <div v-for="exercise in activity?.exercises" :key="exercise._id">{{ exercise }}</div>
    </div>

    <UiModal v-model="isShowConfirm" isConfirm @confirm="mutateDelete(activity?._id)" lang="ru">
      Подтверждаете удаление?
    </UiModal>

    <div :class="$style.buttons">
      <UiButton @click="router.go(-1)">Назад</UiButton>
      <UiButton @click="isShowConfirm = true" layout="secondary">Удалить</UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { toast, UiButton, UiModal } from 'mhz-ui';
import { API_ACTIVITY } from 'fitness-tracker-contracts';

import { useQueryClient } from '@/common/plugins/query';
import { getActivity, deleteActivity } from '@/activity/services';
import { URL_ACTIVITY_ADMIN } from '@/activity/constants';
import { formatDateTime } from '@/common/helpers/date';

const isShowConfirm = ref(false);

const route = useRoute();
const router = useRouter();

const queryClient = useQueryClient();

const activityId = computed(() => route.params.activity);

const { data: activity } = getActivity(activityId);

const { mutate: mutateDelete } = deleteActivity({
  onSuccess: async () => {
    queryClient.removeQueries({ queryKey: [API_ACTIVITY] });
    await queryClient.refetchQueries({ queryKey: [API_ACTIVITY] });
    toast.success('Занятие удалено');
    router.push(URL_ACTIVITY_ADMIN);
  },
});
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}
</style>
