import * as XLSX from 'xlsx';
import {
  FoodInfo,
  HospitalMonthMenu,
  MenuResponseDTO,
} from '@/type/menu/menuResponse';
import { removeTrailingZeros } from '@/utils/meal';
import { EMPTY_FOOD_NAME } from '@/constants/_meal';

export const exportMenuToExcel = (menuData: MenuResponseDTO) => {
  const workbook = XLSX.utils.book_new();
  const sheetData: (string | number)[][] = [];

  menuData.monthMenuList.forEach((menu: HospitalMonthMenu) => {
    menu.foodList.forEach((food: FoodInfo) => {
      if (food.foodName !== EMPTY_FOOD_NAME) {
        sheetData.push([
          menu.menuDate,
          menu.hospitalMenuId,
          food.foodName,
          removeTrailingZeros(food.carbohydrate),
          removeTrailingZeros(food.protein),
          removeTrailingZeros(food.fat),
          removeTrailingZeros(food.kcal),
        ]);
      }
    });
  });

  const sheetDataWithHeaders = [
    [
      '식단 날짜',
      '식단 ID',
      '이름',
      '탄수화물 (g)',
      '단백질 (g)',
      '지방 (g)',
      '칼로리 (Kcal)',
    ],
    ...sheetData,
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(sheetDataWithHeaders);

  XLSX.utils.book_append_sheet(workbook, worksheet, 'MonthMenuList');

  const fileName = `${menuData.monthMenuName}_MonthMenuList.xlsx`;
  XLSX.writeFile(workbook, fileName);
};
