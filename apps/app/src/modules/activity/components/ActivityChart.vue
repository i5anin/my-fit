<template>
  <div>
    <UiChart title="Занятия по неделям" :labels="props.labels" :data="props.data" />
  </div>
</template>

<script setup lang="ts">
import { UiChart } from 'mhz-ui';

interface IProps {
  labels: string[];
  data: number[];
}

const props = defineProps<IProps>();
</script>
