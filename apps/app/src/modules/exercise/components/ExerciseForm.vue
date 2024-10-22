<template>
  <form @submit.prevent="props.exercise?._id ? update() : submit()" :class="$style.form">
    <UiField label="Название" isRequired :error="error('title')">
      <UiInput v-model="formData.title" />
    </UiField>

    <div :class="$style.weights">
      <div>Возможные веса</div>

      <UiCheckbox
        v-for="weight in EXERCISE_WEIGHT_OPTIONS"
        :key="weight"
        :modelValue="choosenWeights.some((choosen) => choosen === weight)"
        @update:modelValue="updateWeights(weight, $event)"
        :label="`${weight} кг.`"
      />
    </div>

    <FormButtons :id="props.exercise?._id" :isLoading="isLoadingPost || isLoadingUpdate" @delete="handleDelete" />
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { UiField, UiInput, UiCheckbox, toast } from 'mhz-ui';
import { API_EXERCISE, IExercise } from 'fitness-tracker-contracts';

import FormButtons from '@/common/components/FormButtons.vue';

import { useQueryClient } from '@/common/plugins/query';
import { useValidator, required } from '@/common/composables/useValidate';
import { clone } from '@/common/helpers/clone';
import { URL_EXERCISE, EXERCISE_WEIGHT_OPTIONS } from '@/exercise/constants';
import { postExercise, updateExercise, deleteExercise } from '@/exercise/services';

interface IProps {
  exercise?: IExercise;
}

const props = defineProps<IProps>();

const queryClient = useQueryClient();

const router = useRouter();

const formData = ref<IExercise>({
  title: '',
  weights: [],
});

const choosenWeights = ref<number[]>([]);

function updateWeights(weight: number, isChecked: boolean) {
  choosenWeights.value = isChecked
    ? [...choosenWeights.value, weight]
    : choosenWeights.value.filter((current) => current !== weight);

  formData.value.weights = [...choosenWeights.value];
}

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
  if (props.exercise) {
    formData.value = clone(props.exercise);
    if (formData.value.weights?.length) choosenWeights.value = [...formData.value.weights];
  }
});
</script>

<style module lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
}

.weights {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
