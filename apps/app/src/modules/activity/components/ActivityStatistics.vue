<template>
  <div>
    <UiFlex column>
      <div>
        <b>Общие данные: </b>
        <span v-if="props.activityStatistics">
          <span>длительность: {{ formatDuration(props.activityStatistics.duration) }}, </span>
          <span>занятия: {{ props.activityStatistics.activitiesCount }}, </span>
          <span>сеты: {{ props.activityStatistics.setsCount }}, </span>
          <span>повторы: {{ props.activityStatistics.repeatsCount }}, </span>
          <span>отдых: {{ props.activityStatistics.averageRestPercent }}%.</span>
        </span>
      </div>

      <div>
        <b>Средние значения: </b>
        <span v-if="props.activityStatistics">
          <span>длительность: {{ formatDuration(props.activityStatistics.averageDuration) }}, </span>
          <span>сетов в занятии: {{ props.activityStatistics.averageSetsPerActivity }}, </span>
          <span>повторов в сете: {{ props.activityStatistics.averageRepeatsPerSet }}, </span>
          <span>повторов в занятии: {{ props.activityStatistics.averageRepeatsPerActivity }}.</span>
        </span>
      </div>
    </UiFlex>
  </div>
</template>

<script setup lang="ts">
import { IActivityStatistics } from 'fitness-tracker-contracts';
import { UiFlex } from 'mhz-ui';
import { formatDuration } from 'mhz-helpers';

interface IProps {
  activityStatistics?: IActivityStatistics;
}

const props = defineProps<IProps>();
</script>
