import {
  URL_ACTIVITY,
  URL_ACTIVITY_CREATE,
  URL_ACTIVITY_EDIT,
  URL_ACTIVITY_ADMIN,
  URL_ACTIVITY_ADMIN_EDIT,
} from '@/activity/constants';

export const activityRoutes = [
  {
    path: URL_ACTIVITY,
    name: 'ActivityList',
    component: () => import('@/activity/pages/ActivityListPage.vue'),
    meta: { layout: 'empty' },
  },
  {
    path: URL_ACTIVITY_CREATE,
    name: 'ActivityCreate',
    component: () => import('@/activity/pages/ActivityCreatePage.vue'),
    meta: { layout: 'empty' },
  },
  {
    path: `${URL_ACTIVITY_EDIT}/:activity`,
    name: 'ActivityEdit',
    component: () => import('@/activity/pages/ActivityEditPage.vue'),
    meta: { layout: 'empty' },
  },

  {
    path: URL_ACTIVITY_ADMIN,
    name: 'ActivityAdminList',
    component: () => import('@/activity/pages/ActivityAdminListPage.vue'),
  },
  {
    path: `${URL_ACTIVITY_ADMIN_EDIT}/:activity`,
    name: 'ActivityAdminEdit',
    component: () => import('@/activity/pages/ActivityAdminEditPage.vue'),
  },
];
