import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { MenuResponseDTO } from '@/type/menu/menuResponse';

interface FindOriginalIdParams {
  list: MenuResponseDTO[];
  matchField: keyof MenuResponseDTO;
  matchValue: string;
  navigateTo: string;
  getId: (item: MenuResponseDTO) => string;
  router: AppRouterInstance;
}

export const findOriginalId = ({
  list,
  matchField,
  matchValue,
  navigateTo,
  getId,
  router,
}: FindOriginalIdParams) => {
  const matchedItem = list.find(
    (item) => String(item[matchField]).slice(0, 4) === matchValue,
  );

  if (matchedItem) {
    const originalId = getId(matchedItem);
    router.push(`${navigateTo}/${originalId}`);
  }
};
