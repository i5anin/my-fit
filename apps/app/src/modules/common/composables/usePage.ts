import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export function usePage() {
  const router = useRouter();
  const route = useRoute();

  const page = ref(Number(route.query.page || 1));

  function resetPage() {
    page.value = 1;
  }

  function setPage(pageToSet: number) {
    page.value = pageToSet;
  }

  watch(
    () => page.value,
    () => {
      router.push({ path: route.path, query: { page: page.value } });
    }
  );

  return { page, resetPage, setPage };
}
