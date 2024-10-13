'use client';

import { cn } from '@/utils/core';
import ControlTab from '@/components/common/ControlTab';
import DatePicker from '@/components/common/DatePicker';
import { Input } from '@/components/common/Input';
import { Selectbox } from '@/components/common/Selectbox';
import { SURVEY_FILTER_OPTIONS, TAB_OPTIONS } from '@/constants/_controlTab';
import { CATEGORIES, ORGANIZATIONS } from '@/constants/_getAllList/_categories';

interface Props {
  type: 'viewPlan' | 'viewChart';
  selectedYear: string;
  selectedMonth: string;
  onYearChange: (year: string) => void;
  onMonthChange: (month: string) => void;
  organization?: string | null;
  setOrganization?: React.Dispatch<React.SetStateAction<string | null>>;
  searchValue: string;
  handlechangeSearchValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitSearchValue: () => void;
  selectedFilter?: string;
  setSelectedFilter?: React.Dispatch<React.SetStateAction<string>>;
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  inputPlaceholder: string;
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
  handlechangeSearchValue,
  submitSearchValue,
  selectedFilter,
  setSelectedFilter,
  selectedTab,
  setSelectedTab,
  inputPlaceholder,
}: Props) => {
  return (
    <>
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
            onChange={handlechangeSearchValue}
            onSubmit={submitSearchValue}
          />
          {type === 'viewPlan' && (
            <div className='flex gap-1 whitespace-pre'>
              <Selectbox
                options={ORGANIZATIONS}
                size='small'
                onChange={(organization) => setOrganization!(organization)}
              />
              {ORGANIZATIONS.map(
                (item, index) =>
                  organization === item.value && (
                    <Selectbox
                      key={item.value}
                      options={CATEGORIES[index]}
                      size='small'
                    />
                  ),
              )}
            </div>
          )}
        </div>
      </div>
      <div className='flex items-center justify-end gap-3'>
        {type === 'viewChart' && (
          <>
            <ControlTab
              controlTabItems={SURVEY_FILTER_OPTIONS}
              selectedTab={selectedFilter!}
              setSelectedTab={setSelectedFilter!}
            />
            <span className='mx-1 h-4 cursor-default text-xs text-gray-500'>
              |
            </span>
          </>
        )}
        <ControlTab
          type='sort'
          controlTabItems={TAB_OPTIONS}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>
    </>
  );
};

export default GetAllListControls;
