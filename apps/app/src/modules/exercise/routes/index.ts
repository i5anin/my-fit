import { URL_EXERCISE, URL_EXERCISE_CREATE, URL_EXERCISE_EDIT } from '@/exercise/constants';

export const exerciseRoutes = [
  {
    path: URL_EXERCISE,
    name: 'ExerciseList',
    component: () => import('@/exercise/pages/ExerciseListPage.vue'),
  },
  {
    path: URL_EXERCISE_CREATE,
    name: 'ExerciseCreate',
    component: () => import('@/exercise/pages/ExerciseCreatePage.vue'),
  },
  {
    path: `${URL_EXERCISE_EDIT}/:exercise`,
    name: 'ExerciseEdit',
    component: () => import('@/exercise/pages/ExerciseEditPage.vue'),
  },
];
