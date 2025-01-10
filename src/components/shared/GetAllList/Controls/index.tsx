'use client';

import { cn } from '@/utils/core';
import DatePicker from '@/components/common/DatePicker';
import { Input } from '@/components/common/Input';
import { Option, Selectbox } from '@/components/common/Selectbox';
import { ORGANIZATION_LIST } from '@/constants/_category';

interface Props {
  type: 'viewPlan' | 'viewChart';
  selectedYear: string;
  selectedMonth: string;
  onYearChange: (year: string) => void;
  onMonthChange: (month: string) => void;
  organization?: string;
  setOrganization?: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
  handleChangeSearchValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputPlaceholder: string;
  handleSearchSubmit: () => void;
  minorCategories?: Option[];
  selectedCategory?: string;
  setSelectedCategory?: React.Dispatch<React.SetStateAction<string>>;
}

const GetAllListControls = ({
  type,
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
  organization,
  setOrganization,
  searchValue,
  handleChangeSearchValue,
  inputPlaceholder,
  handleSearchSubmit,
  minorCategories,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  const handleOrganizationChange = (newOrganization: string) => {
    if (newOrganization !== organization) {
      setOrganization!(newOrganization);
      setSelectedCategory!('');
    }
  };

  return (
    <div className='flex justify-between'>
      <DatePicker
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={onMonthChange}
        onYearChange={onYearChange}
      />
      <div
        className={cn(
          'flex w-full items-end justify-end gap-5',
          type === 'viewChart' && 'w-1/2',
        )}
      >
        <Input
          isLeftIcon={true}
          height='basic'
          placeholder={inputPlaceholder}
          bgcolor='meal'
          includeButton={true}
          value={searchValue}
          onChange={handleChangeSearchValue}
          onSubmit={handleSearchSubmit}
        />
        {type === 'viewPlan' && setOrganization && setSelectedCategory && (
          <div className='flex gap-1 whitespace-pre'>
            <Selectbox
              options={ORGANIZATION_LIST}
              size='small'
              onChange={handleOrganizationChange}
              selectedValue={organization}
            />
            {ORGANIZATION_LIST.map(
              (item) =>
                organization === item.value && (
                  <Selectbox
                    key={item.value}
                    options={minorCategories}
                    size='small'
                    onChange={(category) => setSelectedCategory(category)}
                    selectedValue={selectedCategory}
                  />
                ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetAllListControls;
