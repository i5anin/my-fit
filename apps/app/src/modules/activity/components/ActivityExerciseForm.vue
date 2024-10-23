<template>
  <div :class="$style.page">
    <ActivityExerciseList
      v-if="props.activity.exercises.length"
      :exercises="props.activity.exercises"
      :activeExerciseId="activeExerciseId"
      @start="startExercise"
      @stop="stopExercise"
    />

    <div>Занятие началось {{ formatDateTime(props.activity.dateCreated) }}.</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { toast } from 'mhz-ui';
import { API_ACTIVITY, IActivity } from 'fitness-tracker-contracts';

import ActivityExerciseList from '@/activity/components/ActivityExerciseList.vue';

import { updateActivity } from '@/activity/services';
import { formatDateTime } from '@/common/helpers/date';
import { useQueryClient } from '@/common/plugins/query';
import { clone } from '@/common/helpers/clone';

interface IProps {
  activity: IActivity;
}

const props = defineProps<IProps>();

const formData = ref<IActivity>({
  exercises: [],
});

const activeExerciseId = ref<string>();

const queryClient = useQueryClient();

const { mutate: mutateUpdate } = updateActivity({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_ACTIVITY] });
    toast.success('Упражнение обновлено');
  },
});

function startExercise(id: string) {
  activeExerciseId.value = id;
}

function stopExercise(id: string) {
  activeExerciseId.value = undefined;

  formData.value.exercises = formData.value.exercises.map((exercise) => {
    if (exercise._id === id) {
      return { ...exercise, isDone: true };
    }

    return exercise;
  });

  mutateUpdate(formData.value);
}

onMounted(() => {
  if (props.activity) formData.value = clone(props.activity);
});
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
