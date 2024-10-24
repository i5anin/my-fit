<template>
  <div>
    {{ formatDate(props.activity.dateCreated) }}
  </div>
</template>

<script setup lang="ts">
import { IActivity } from 'fitness-tracker-contracts';

import { formatDate } from '@/common/helpers/date';

interface IProps {
  activity: IActivity;
}

const props = defineProps<IProps>();
</script>
