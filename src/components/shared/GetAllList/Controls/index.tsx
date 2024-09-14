'use client';

import ControlTab from '@/components/common/ControlTab';
import DatePicker from '@/components/common/DatePicker';
import { Input } from '@/components/common/Input';
import { Selectbox } from '@/components/common/Selectbox';
import { TAB_OPTIONS } from '@/constants/_controlTab';
import { CATEGORIES, ORGANIZATIONS } from '@/constants/_getAllList/_categories';

interface Props {
  type: 'viewPlan' | 'viewChart';
  selectedYear: string;
  selectedMonth: string;
  onYearChange: (year: string) => void;
  onMonthChange: (month: string) => void;
  organization?: string | null;
  setOrganization?: React.Dispatch<React.SetStateAction<string | null>>;
  handleSearchName: () => void;
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

const GetAllListControls = ({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
  organization,
  setOrganization,
  handleSearchName,
  selectedTab,
  setSelectedTab,
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
        <div className='flex items-end gap-5'>
          <Input
            isLeftIcon={true}
            height='basic'
            placeholder='식단 이름을 입력해주세요.'
            bgcolor='search'
            includeButton={true}
            onSubmit={handleSearchName}
          />
          <div className='flex gap-2'>
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
        </div>
      </div>
      <div className='flex justify-end'>
        <ControlTab
          controlTabItems={TAB_OPTIONS}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>
    </>
  );
};

export default GetAllListControls;
