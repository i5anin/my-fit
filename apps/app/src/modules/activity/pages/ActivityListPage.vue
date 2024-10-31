<template>
  <div>
    <UiFlex column gap="32">
      <ActivityAdminList :activities="activities" />

      <UiPagination
        v-show="activities?.length"
        :page="page"
        :total="total"
        @update="(value: number) => setPage(setPaginationPage(value, page))"
        lang="ru"
      />
    </UiFlex>
  </div>
</template>

<script setup lang="ts">
import { UiFlex, UiPagination } from 'mhz-ui';

import ActivityAdminList from '@/activity/components/ActivityAdminList.vue';

import { usePagination } from '@/common/composables/usePagination';
import { usePage } from '@/common/composables/usePage';
import { getActivities } from '@/activity/services';

const { page, setPage } = usePage();

const { data } = getActivities(page);

const { data: activities, total, setPaginationPage } = usePagination(data);
</script>
