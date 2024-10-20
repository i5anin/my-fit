<template>
  <form @submit.prevent="props.exercise?._id ? update() : submit()" :class="$style.form">
    <UiField label="Название" isRequired :error="error('title')">
      <UiInput v-model="formData.title" />
    </UiField>

    <FormButtons :id="props.exercise?._id" :isLoading="isLoadingPost || isLoadingUpdate" @delete="handleDelete" />
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { UiField, UiInput, toast } from 'mhz-ui';
import { API_EXERCISE, IExercise } from 'fitness-tracker-contracts';

import { useQueryClient } from '@/common/plugins/query';
import { useValidator, required } from '@/common/composables/useValidate';
import { clone } from '@/common/plugins/clone';

import FormButtons from '@/common/components/FormButtons.vue';

import { URL_EXERCISE } from '@/exercise/constants';
import { postExercise, updateExercise, deleteExercise } from '@/exercise/services';

interface IProps {
  exercise?: IExercise;
}

const props = defineProps<IProps>();

const queryClient = useQueryClient();

const router = useRouter();

const formData = ref<IExercise>({
  title: '',
});

const { mutate: mutatePost, isPending: isLoadingPost } = postExercise({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_EXERCISE] });
    toast.success('Упражнение добавлено');
    router.push(URL_EXERCISE);
  },
});

const { mutate: mutateUpdate, isPending: isLoadingUpdate } = updateExercise({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_EXERCISE] });
    toast.success('Упражнение обновлено');
  },
});

const { mutate: mutateDelete } = deleteExercise({
  onSuccess: async () => {
    queryClient.removeQueries({ queryKey: [API_EXERCISE] });
    await queryClient.refetchQueries({ queryKey: [API_EXERCISE] });
    toast.success('Упражнение удалено');
    router.push(URL_EXERCISE);
  },
});

const rules = computed(() => {
  return {
    title: required,
  };
});

const { error, isValid } = useValidator(formData, rules);

function submit() {
  if (isValid()) mutatePost(formData.value);
}

function update() {
  if (isValid()) mutateUpdate(formData.value);
}

function handleDelete(id: string) {
  mutateDelete(id);
}

onMounted(() => {
  if (props.exercise) formData.value = clone(props.exercise);
});
</script>

<style module lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
}
</style>
