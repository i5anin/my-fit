<template>
  <div>{{ props.activities }}</div>
</template>

<script setup lang="ts">
import { IActivity } from 'fitness-tracker-contracts';

interface IProps {
  activities?: IActivity[];
}

const props = defineProps<IProps>();
</script>
