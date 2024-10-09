/**
 * @description 병원 식단 소분류 카테고리
 */
export type HospitalMinorCategory =
  | '연하3단계죽'
  | '당뇨연식1800Kcal'
  | '고단백연식'
  | '고단백식'
  | '당뇨상식1800Kcal'
  | '전체'
  | '당뇨상식1400Kcal'
  | '혈투연식'
  | '고단백상식'
  | '신부전상식'
  | '간성혼수상식'
  | '당뇨상식2200Kcal'
  | '일반연식'
  | '당뇨연식2100Kcal'
  | '저염연식'
  | '일반상식'
  | '위절제상식'
  | '당뇨연식1400Kcal'
  | '당뇨상식2100Kcal'
  | '저지방상식'
  | '저염식'
  | '당뇨연식2200Kcal'
  | '상식'
  | '선택식'
  | '저염상식'
  | '혈투상식'
  | '신부전연식';

/**
 * @description 식단 대분류 카테고리
 */
export type MajorCategory = '학교' | '병원';

/**
 * @description 자동 식단 생성 request body
 */
export interface MonthMenusAutoRequest {
  majorCategory: MajorCategory;
  minorCategory: HospitalMinorCategory;
  dayCount: number;
}

/**
 * @description 병원 하루 식단
 */
export interface HospitalAutoDayMenus {
  hospitalMenuId: string | null;
  menuDate: string; // '2024-09-25'
  food1: string;
  food2: string;
  food3: string;
  food4: string;
  food5: string;
  food6: string;
  food7: string;
}

/**
 * @description 식단 저장, 수정 request body
 */
export interface MonthMenusSaveRequest {
  monthMenuName: string;
  majorCategory: MajorCategory;
  minorCategory: HospitalMinorCategory;
  monthMenusSaveList: HospitalAutoDayMenus[];
}
