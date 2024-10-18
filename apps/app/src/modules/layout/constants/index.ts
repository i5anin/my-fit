import { URL_USER } from '@/user/constants';
import { URL_EXERCISE } from '@/exercise/constants';

import { INavItem } from '@/layout/interface';

export const NAV_ITEMS: INavItem[] = [
  { _id: '1', url: URL_EXERCISE, title: 'Exercises' },
  { _id: '2', url: URL_USER, title: 'Users' },
];
