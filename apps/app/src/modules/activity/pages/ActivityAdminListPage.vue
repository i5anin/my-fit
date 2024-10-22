<template>
  <div>
    <div :class="$style.page">
      <ActivityAdminList :activities="activities" />

      <UiPagination
        v-show="activities?.length"
        :page="page"
        :total="total"
        @update="(value: number) => setPage(setPaginationPage(value, page))"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { UiPagination } from 'mhz-ui';

import ActivityAdminList from '@/activity/components/ActivityAdminList.vue';

import { usePagination } from '@/common/composables/usePagination';
import { usePage } from '@/common/composables/usePage';
import { getActivities } from '@/activity/services';

const { page, setPage } = usePage();

const { data } = getActivities(page);

const { data: activities, total, setPaginationPage } = usePagination(data);
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
