<template>
  <div v-if="isShowForm">
    <h2>Сформировать занятие</h2>

    <form @submit.prevent="submit" :class="$style.form">
      <UiButton @click="isShowModal = true">Добавить упражнение</UiButton>

      <UiModal v-model="isShowModal">
        <ExerciseChooseList v-if="exercises?.length" :exercises="exercises" @choose="addExercise" />
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
import { useRouter } from 'vue-router';

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
import { URL_ACTIVITY_EDIT } from '@/activity/constants';

const router = useRouter();

const queryClient = useQueryClient();

const formData = ref<IActivity>({
  exercises: [],
  isDone: false,
});

const isShowModal = ref(false);
const isShowForm = ref(true);

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
  onSuccess: async (id: string) => {
    await queryClient.refetchQueries({ queryKey: [API_ACTIVITY] });
    toast.success('Занятие начато');

    router.push(`${URL_ACTIVITY_EDIT}/${id}`);
  },
});

const isValid = computed(() => !!formData.value.exercises?.length);

function submit() {
  if (isValid.value) {
    isShowForm.value = false;
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
