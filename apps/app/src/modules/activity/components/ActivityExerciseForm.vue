<template>
  <div :class="$style.page">
    <ActivityExerciseList
      v-if="props.activity.exercises.length"
      :exercises="props.activity.exercises"
      :activeExerciseId="activeExerciseId"
      :isActivityDone="formData.isDone"
      @start="startExercise"
      @stop="stopExercise"
    />

    <div>
      <div>Занятие началось {{ formatDateTime(props.activity.dateCreated) }}.</div>

      <div v-if="props.activity.dateUpdated">
        Занятие {{ formData.isDone ? 'закончено' : 'обновлено' }} {{ formatDateTime(props.activity.dateUpdated) }}.
      </div>

      <div>
        Длительность:
        <ActivityDuration
          v-if="formData._id"
          :duration="formData.duration"
          :start="!formData.isDone"
          :stop="formData.isDone"
          @stop="finishActivity"
        />
      </div>
    </div>

    <UiButton @click="formData.isDone = true" layout="secondary" :isDisabled="props.activity.isDone">
      Завершить занятие досрочно
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { toast, UiButton } from 'mhz-ui';
import { API_ACTIVITY, IActivity, IExerciseDone } from 'fitness-tracker-contracts';

import ActivityExerciseList from '@/activity/components/ActivityExerciseList.vue';
import ActivityDuration from '@/activity/components/ActivityDuration.vue';

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
  duration: 0,
  isDone: false,
});

const activeExerciseId = ref<string>();

const queryClient = useQueryClient();

const { mutate: mutateUpdate } = updateActivity({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_ACTIVITY] });
  },
});

function startExercise(id: string) {
  activeExerciseId.value = id;
}

function stopExercise(exerciseDone: IExerciseDone) {
  activeExerciseId.value = undefined;

  formData.value.exercises = formData.value.exercises.map((exercise) => {
    if (exercise._id === exerciseDone._id) {
      return {
        ...exercise,
        isDone: true,
        duration: exerciseDone.duration,
        isToFailure: exerciseDone.isToFailure,
        repeats: exerciseDone.repeats,
      };
    }

    return exercise;
  });

  formData.value.isDone = !formData.value.exercises.some((exercise) => !exercise.isDone);

  mutateUpdate(formData.value);
}

function finishActivity(duration: number) {
  formData.value.duration = duration;

  mutateUpdate(formData.value);

  toast.success('Занятие закончено');
}

onMounted(() => {
  if (props.activity) formData.value = clone(props.activity);
});
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
