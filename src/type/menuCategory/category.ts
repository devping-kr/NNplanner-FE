import { MajorCategory } from '@/type/menu/menuRequest';

export type HandleChangeCategoryParam = 'majorCategory' | 'minorCategory';

export type SelectedCategory = {
  majorCategory: MajorCategory | '';
  minorCategory: string;
};
