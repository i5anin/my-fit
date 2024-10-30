import { URL_USER } from '@/user/constants';
import { URL_EXERCISE } from '@/exercise/constants';
import { URL_ACTIVITY_ADMIN } from '@/activity/constants';

import IconExercise from '@/layout/icons/nav-exercise.svg?component';
import IconActivity from '@/layout/icons/nav-activity.svg?component';
import IconUser from '@/layout/icons/nav-user.svg?component';

import { INavItem } from '@/layout/interface';

export const NAV_ITEMS: INavItem[] = [
  { _id: '1', url: URL_EXERCISE, title: 'Упражнения', icon: IconExercise },
  { _id: '2', url: URL_ACTIVITY_ADMIN, title: 'Занятия', icon: IconActivity },
  { _id: '3', url: URL_USER, title: 'Пользователи', icon: IconUser },
];
