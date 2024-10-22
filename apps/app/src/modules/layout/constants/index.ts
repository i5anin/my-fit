import { URL_USER } from '@/user/constants';
import { URL_EXERCISE } from '@/exercise/constants';
import { URL_ACTIVITY_ADMIN } from '@/activity/constants';

import { INavItem } from '@/layout/interface';

export const NAV_ITEMS: INavItem[] = [
  { _id: '1', url: URL_EXERCISE, title: 'Упражнения' },
  { _id: '2', url: URL_ACTIVITY_ADMIN, title: 'Занятия' },
  { _id: '3', url: URL_USER, title: 'Пользователи' },
];
