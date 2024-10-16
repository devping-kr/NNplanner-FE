import { MAJOR_CATEGORIES } from '@/constants/_meal';

export const SCHOOL_LEVEL_LIST = [
  { value: '초등학교', label: '초등학교' },
  { value: '중학교', label: '중학교' },
  { value: '고등학교', label: '고등학교' },
];

export const ORGANIZATION_LIST = [
  { value: MAJOR_CATEGORIES[0], label: MAJOR_CATEGORIES[0] },
  { value: MAJOR_CATEGORIES[1], label: MAJOR_CATEGORIES[1] },
  { value: MAJOR_CATEGORIES[2], label: MAJOR_CATEGORIES[2] },
];

export const MOCK_CATEGORY_LIST = [
  SCHOOL_LEVEL_LIST,
  ORGANIZATION_LIST,
  [
    { value: '1', label: '세번쨰' },
    { value: '2', label: MAJOR_CATEGORIES[1] },
    { value: '3', label: MAJOR_CATEGORIES[2] },
    { value: '4', label: '세번쨰' },
    { value: '5', label: MAJOR_CATEGORIES[1] },
    { value: '6', label: MAJOR_CATEGORIES[2] },
  ],
];

export const CATEGORY_MAPPINGS = [
  { category: MAJOR_CATEGORIES[0], queryKey: 'getSchoolMinorCategories' },
  { category: MAJOR_CATEGORIES[1], queryKey: 'getSchoolNameMinorCategories' },
  { category: MAJOR_CATEGORIES[2], queryKey: 'getHospitalMinorCategories' },
] as const;
