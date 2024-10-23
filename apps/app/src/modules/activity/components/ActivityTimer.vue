<template>
  <div :class="$style.timer">
    <span>{{ addZero(minutes) }}</span
    >:<span>{{ addZero(seconds) }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface IProps {
  start: boolean;
  stop: boolean;
}

const props = defineProps<IProps>();

watch(
  () => [props.start, props.stop],
  () => {
    if (props.start) startTimer();
    if (props.stop) stopTimer();
  }
);

const seconds = ref(0);
const minutes = ref(0);

// eslint-disable-next-line no-undef
let interval: NodeJS.Timeout;

function updateTime() {
  seconds.value++;

  if (seconds.value === 60) {
    minutes.value++;
    seconds.value = 0;
  }
}

function startTimer() {
  interval = setInterval(updateTime, 1000);
}

function stopTimer() {
  clearInterval(interval);
}

function addZero(value: number) {
  return value.toString().length > 1 ? `${value}` : `0${value}`;
}
</script>

<style module lang="scss">
.timer {
  font-size: 2rem;
  text-align: center;
}
</style>
