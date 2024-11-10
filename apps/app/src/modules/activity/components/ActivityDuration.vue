<template>
  <div :class="$style.timer">
    <span>{{ addZero(minutes) }}</span
    >:<span>{{ addZero(seconds) }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { addZero } from 'mhz-helpers';

interface IProps {
  duration?: number;
  start?: boolean;
  stop?: boolean;
}

const props = defineProps<IProps>();
const emit = defineEmits(['stop']);

watch(
  () => [props.start, props.stop],
  () => {
    if (props.start && !props.duration) startTimer();
    if (props.stop && !props.duration) stopTimer();
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
  emit('stop', minutes.value * 60 + seconds.value);
  clearInterval(interval);
}

onMounted(() => {
  if (props.start && !props.duration) startTimer();

  if (props.duration) {
    minutes.value = Math.floor(props.duration / 60);
    seconds.value = props.duration - minutes.value * 60;
  }
});
</script>

<style module lang="scss">
.timer {
  font-size: 2rem;
  text-align: center;
}
</style>
