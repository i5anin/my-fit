<template>
  <component :is="props.isBig ? 'div' : 'span'" :class="$style.timer" :data-big="props.isBig">
    <span>{{ addZero(minutes) }}<span v-if="!props.isBig"> мин. </span></span><span v-if="props.isBig">:</span
    ><span>{{ addZero(seconds) }}<span v-if="!props.isBig"> сек. </span></span>
  </component>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

interface IProps {
  duration?: number;
  start?: boolean;
  stop?: boolean;
  isBig?: boolean;
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

function addZero(value: number) {
  return value.toString().length > 1 ? `${value}` : `0${value}`;
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
  text-align: center;

  &[data-big='true'] {
    font-size: 2rem;
  }
}
</style>
