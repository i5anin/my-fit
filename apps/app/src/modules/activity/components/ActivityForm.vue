<template>
  <div>
    <h2>Сформировать занятие</h2>

    <form @submit.prevent="submit" :class="$style.form">
      <UiButton @click="isShowModal = true">Добавить упражнение</UiButton>

      <UiModal v-model="isShowModal">
        <ExerciseChooseList :exercises="exercises" @choose="addExercise" />
      </UiModal>

      <div v-if="formData.exercises?.length">
        <h3>Упражнения</h3>

        <ExerciseChoosenList :choosenExercises="formData.exercises" @update="updateExercises" />
      </div>

      <UiButton layout="accent" :isDisabled="!isValid || isLoadingPost" type="submit">Начать</UiButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { toast, UiButton, UiModal } from 'mhz-ui';
import { API_ACTIVITY, IActivity, IExerciseChoosen } from 'fitness-tracker-contracts';

import ExerciseChooseList from '@/exercise/components/ExerciseChooseList.vue';
import ExerciseChoosenList from '@/exercise/components/ExerciseChoosenList.vue';

import { usePage } from '@/common/composables/usePage';
import { usePagination } from '@/common/composables/usePagination';
import { getExercises } from '@/exercise/services';
import { postActivity } from '@/activity/services';
import { useQueryClient } from '@/common/plugins/query';
import { deleteTempId } from '@/common/helpers/id';

const queryClient = useQueryClient();

const formData = ref<IActivity>({
  exercises: [],
});

const isShowModal = ref(false);

const { page } = usePage();

const { data } = getExercises(page);

const { data: exercises } = usePagination(data);

function addExercise(exercise: IExerciseChoosen) {
  formData.value.exercises = formData.value.exercises?.length ? [...formData.value.exercises, exercise] : [exercise];

  isShowModal.value = false;
}

function updateExercises(updatedExercises: IExerciseChoosen[]) {
  formData.value.exercises = [...updatedExercises];
}

const { mutate: mutatePost, isPending: isLoadingPost } = postActivity({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_ACTIVITY] });
    toast.success('Занятие начато');
  },
});

const isValid = computed(() => !!formData.value.exercises?.length);

function submit() {
  if (isValid.value) {
    formData.value.exercises = deleteTempId(formData.value.exercises);
    mutatePost(formData.value);
  }
}
</script>

<style module lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
