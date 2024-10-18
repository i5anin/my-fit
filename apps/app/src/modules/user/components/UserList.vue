<template>
  <UiTable :headers="tableHeaders" :isLoading="!props.users?.length">
    <template v-if="props.users?.length">
      <tr v-for="user in props.users" :key="user._id">
        <td data-grow>
          <RouterLink :to="`${URL_USER_EDIT}/${user._id}`">
            {{ user.email }}
          </RouterLink>
        </td>
        <td data-no-wrap>
          {{ formatDate(user.dateCreated) }}
        </td>
        <td data-no-wrap>
          {{ formatDate(user.dateUpdated) }}
        </td>
      </tr>
    </template>
  </UiTable>
</template>

<script setup lang="ts">
import { UiTable } from 'mhz-ui';
import { IUser } from 'fitness-tracker-contracts';

import { formatDate } from '@/common/plugins/date';

import { URL_USER_EDIT } from '@/user/constants';

interface IProps {
  users?: IUser[];
}

const props = defineProps<IProps>();

const tableHeaders = [{ title: 'Name' }, { title: 'Created' }, { title: 'Updated' }];
</script>
