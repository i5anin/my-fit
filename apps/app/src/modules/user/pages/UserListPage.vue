<template>
  <div>
    <div :class="$style.page">
      <RouterLink :to="URL_USER_CREATE">Добавить пользователя</RouterLink>

      <UserList :users="users" />

      <UiPagination
        v-show="users?.length"
        :page="page"
        :total="total"
        @update="(value: number) => setPage(setPaginationPage(value, page))"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { UiPagination } from 'mhz-ui';

import { usePagination } from '@/common/composables/usePagination';
import { usePage } from '@/common/composables/usePage';

import UserList from '@/user/components/UserList.vue';

import { getUsers } from '@/user/services';
import { URL_USER_CREATE } from '@/user/constants';

const { page, setPage } = usePage();

const { data } = getUsers(page);

const { data: users, total, setPaginationPage } = usePagination(data);
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
