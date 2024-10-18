<template>
  <div>
    <component v-if="isLoaded" :is="layoutComponent" :data-layout="layoutComponent.name" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getCookieToken } from '@/common/composables/useAuth';
import { setAuthHeader } from '@/common/plugins/api';

import LayoutDefault from '@/layout/components/LayoutDefault.vue';
import LayoutEmpty from '@/layout/components/LayoutEmpty.vue';

import { checkAuth } from '@/auth/services';
import { TOKEN_NAME, URL_LOGIN } from '@/auth/constants';

const route = useRoute();
const router = useRouter();

const isLoaded = ref(false);

const layoutComponent = computed(() => {
  return route.meta.layout === 'empty' ? LayoutEmpty : LayoutDefault;
});

const isLoginPage = window.location.pathname === URL_LOGIN;

const token = getCookieToken(TOKEN_NAME);

if (!isLoginPage && token) {
  setAuthHeader(token);

  checkAuth();
}

onMounted(async () => {
  await router.isReady();
  isLoaded.value = true;
});
</script>
