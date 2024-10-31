import { MenuResponseDTO } from '@/type/menu/menuResponse';

interface FindOriginalIdParams {
  list: MenuResponseDTO[];
  matchField: keyof MenuResponseDTO;
  matchValue: string;
  navigateTo: string;
  getId: (item: MenuResponseDTO) => string;
  navigate: (path: string) => void;
}

export const findOriginalId = ({
  list,
  matchField,
  matchValue,
  navigateTo,
  getId,
  navigate,
}: FindOriginalIdParams) => {
  const matchedItem = list.find(
    (item) => String(item[matchField]).slice(0, 4) === matchValue,
  );

  if (matchedItem) {
    const originalId = getId(matchedItem);
    navigate(`${navigateTo}/${originalId}`);
  }
};
