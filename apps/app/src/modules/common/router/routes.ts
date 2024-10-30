import { RouteRecordRaw } from 'vue-router';

import { authRoutes } from '@/auth/routes';
import { userRoutes } from '@/user/routes';
import { exerciseRoutes } from '@/exercise/routes';
import { activityRoutes } from '@/activity/routes';
import { URL_HOME, URL_ERROR } from '@/common/constants';

export const routes: RouteRecordRaw[] = [
  ...authRoutes,
  ...userRoutes,
  ...exerciseRoutes,
  ...activityRoutes,

  { path: URL_HOME, name: 'Home', component: () => import('@/common/pages/HomePage.vue'), meta: { layout: 'empty' } },
  { path: URL_ERROR, name: '404', component: () => import('@/common/pages/ErrorPage.vue'), meta: { layout: 'empty' } },
  { path: '/:catchAll(.*)', name: 'error', redirect: '404' },
];
