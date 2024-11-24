<template>
  <div>
    <UiFlex column>
      <UiFlex gap="16">
        <UiButton
          v-for="chartType in CHART_TYPES"
          :key="chartType.value"
          :layout="chartType.value === type ? 'accent' : 'primary'"
          isNarrow
          @click="type = chartType.value"
          >{{ chartType.title }}</UiButton
        >
      </UiFlex>

      <UiChart v-if="chart" :labels="chart.labels" :data="chart.data" type="Line" :key="type" />
    </UiFlex>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiButton, UiChart, UiFlex } from 'mhz-ui';
import { TActivityChartType } from 'fitness-tracker-contracts';

import { getActivityChart } from '@/activity/services';
import { CHART_TYPES } from '@/activity/constants';

const type = ref<TActivityChartType>('activity');

const { data: chart } = getActivityChart(type);
</script>
