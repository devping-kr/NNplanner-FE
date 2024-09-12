import { useState } from 'react';
import { Option, Selectbox } from '@/components/common/Selectbox';
import { MealHeaderTitle } from '@/components/common/Typography';

type MealHeaderProps = {
  name: string;
  categories: Option[][];
};

export const organizationList = [
  { value: '학교', label: '학교' },
  { value: '학교명', label: '학교명' },
  { value: '병원', label: '병원' },
];

export const schoolLevelList = [
  { value: '초등학교', label: '초등학교' },
  { value: '중학교', label: '중학교' },
  { value: '고등학교', label: '고등학교' },
];

const MealHeader = ({ name, categories }: MealHeaderProps) => {
  const [organization, setOrganization] = useState<null | string>(null);

  const onOrganizationChange = (organization: string) => {
    setOrganization(organization);
  };

  return (
    <div className='flex w-full flex-col gap-8 px-14 py-10'>
      <MealHeaderTitle>{name}</MealHeaderTitle>
      <div className='flex gap-2'>
        <Selectbox
          options={organizationList}
          size='basic'
          onChange={(organization) => onOrganizationChange(organization)}
        />
        {organizationList.map(
          (item, index) =>
            organization === item.value && (
              <Selectbox
                key={item.value}
                options={categories[index]}
                size='basic'
              />
            ),
        )}
      </div>
    </div>
  );
};

export default MealHeader;
