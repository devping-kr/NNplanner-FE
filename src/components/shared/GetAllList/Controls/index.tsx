'use client';

import Button from '@/components/common/Button/Button';
import DatePicker from '@/components/common/DatePicker';
import Icon from '@/components/common/Icon';
import { Input } from '@/components/common/Input';
import { Option, Selectbox } from '@/components/common/Selectbox';
import { Subtitle2White } from '@/components/common/Typography';
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

  const resetCategories = () => {
    setOrganization!('');
    setSelectedCategory!('');
  };

  return (
    <div className='flex justify-between'>
      <DatePicker
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={onMonthChange}
        onYearChange={onYearChange}
      />
      <div className='flex w-full items-end justify-end gap-4'>
        {type === 'viewPlan' && setOrganization && setSelectedCategory && (
          <div className='flex gap-2 whitespace-pre'>
            <Selectbox
              key={organization}
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
            <Button
              disabled={!organization}
              variant='grey'
              size='sm'
              width='fit'
              onClick={resetCategories}
            >
              <Subtitle2White>분류 초기화</Subtitle2White>
            </Button>
          </div>
        )}
        <div className='relative h-12 w-60'>
          <div className='absolute right-[14px] top-[14px]'>
            <Icon
              name='search'
              width={20}
              height={20}
              className=''
              color='black'
            />
          </div>
          <Input
            variant='white'
            placeholder={inputPlaceholder}
            value={searchValue}
            onChange={handleChangeSearchValue}
          />
        </div>
        <div className='w-[60px]'>
          <Button
            variant='primary'
            size='sm'
            onClick={handleSearchSubmit}
            width='full'
          >
            <Subtitle2White>검색</Subtitle2White>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GetAllListControls;
