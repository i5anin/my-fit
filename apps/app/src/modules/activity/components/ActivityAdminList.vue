<template>
  <UiTable :headers="tableHeaders" :isLoading="!props.activities?.length" lang="ru">
    <template v-if="props.activities?.length">
      <tr v-for="activity in props.activities" :key="activity._id">
        <td data-grow>
          <RouterLink :to="`${URL_ACTIVITY_ADMIN_EDIT}/${activity._id}`">
            {{ formatDate(activity.dateCreated) }}
          </RouterLink>
        </td>
      </tr>
    </template>
  </UiTable>
</template>

<script setup lang="ts">
import { UiTable } from 'mhz-ui';
import { IActivity } from 'fitness-tracker-contracts';

import { formatDate } from '@/common/helpers/date';
import { URL_ACTIVITY_ADMIN_EDIT } from '@/activity/constants';

interface IProps {
  activities?: IActivity[];
}

const props = defineProps<IProps>();

const tableHeaders = [{ title: 'Создано' }];
</script>
