'use client';

import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button/Button';
import Calendar from '@/components/common/Calendar';
import Icon from '@/components/common/Icon';
// import Navbar from '@/components/common/Navbar';
import { Option, Selectbox } from '@/components/common/Selectbox';
import Table from '@/components/common/Table';
import { useToastStore } from '@/stores/useToastStore';

// 테이블 예시 데이터
const tableData2 = [
  {
    id: 1,
    title: 'First Item',
    createdAt: '2024-09-01T12:00:00Z',
  },
  {
    id: 2,
    title: 'Second Item',
  },
  {
    id: 3,
    title: 'Third Item',
    description: 'This is the description for the third item.',
    createdAt: '2024-09-03T09:15:00Z',
  },
  {
    id: 4,
    title: 'Item',
    description: 'This is the description for the third item.',
    createdAt: '2024-09-03T09:15:00Z',
  },
];

// 영양성분 보여줄 때. 백엔드에서 객체로 받는 데이터.
const tableData1 = [
  {
    '에너지(kcal)': 250,
    '탄수화물(g)': 30,
    '단백질(g)': 15,
    '지방(g)': 10,
  },
  {
    '에너지(kcal)': 250,
    '탄수화물(g)': 30,
    '단백질(g)': 15,
    '지방(g)': 10,
  },
];

const page = () => {
  const calendarData = {
    '2024-09-01': [
      { id: '1', content: '비빔밥' },
      { id: '2', content: '된장국' },
      { id: '3', content: '오이무침' },
      { id: '4', content: '시금치나물' },
      { id: '5', content: '김치' },
    ],
    '2024-09-02': [
      { id: '1', content: '김치찌개' },
      { id: '2', content: '잡채' },
      { id: '3', content: '계란말이' },
      { id: '4', content: '도토리묵' },
      { id: '5', content: '깍두기' },
    ],
    '2024-09-03': [
      { id: '1', content: '불고기' },
      { id: '2', content: '미역국' },
      { id: '3', content: '고구마줄기볶음' },
      { id: '4', content: '콩나물무침' },
      { id: '5', content: '배추김치' },
      { id: '6', content: '김' },
    ],
    '2024-09-04': [
      { id: '1', content: '삼계탕' },
      { id: '2', content: '깍두기' },
      { id: '3', content: '부추전' },
      { id: '4', content: '오이소박이' },
      { id: '5', content: '콩나물국' },
    ],
    '2024-09-05': [
      { id: '1', content: '갈비찜' },
      { id: '2', content: '두부조림' },
      { id: '3', content: '시래기국' },
      { id: '4', content: '무생채' },
      { id: '5', content: '김치' },
    ],
    '2024-09-06': [
      { id: '1', content: '비빔국수' },
      { id: '2', content: '계란찜' },
      { id: '3', content: '어묵볶음' },
      { id: '4', content: '고사리나물' },
      { id: '5', content: '김치' },
    ],
    '2024-09-07': [
      { id: '1', content: '청국장' },
      { id: '2', content: '돼지불고기' },
      { id: '3', content: '애호박전' },
      { id: '4', content: '콩자반' },
      { id: '5', content: '배추김치' },
      { id: '6', content: '무말랭이' },
    ],
  };

  const options: Option[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
    { value: 'elderberry', label: 'Elderberry' },
    { value: 'fig', label: 'Fig' },
    { value: 'grape', label: 'Grape' },
    { value: 'honeydew', label: 'Honeydew' },
    { value: 'kiwi', label: 'Kiwi' },
    { value: 'lemon', label: 'Lemon' },
    { value: 'mango', label: 'Mango' },
    { value: 'nectarine', label: 'Nectarine' },
    { value: 'orange', label: 'Orange' },
    { value: 'papaya', label: 'Papaya' },
    { value: 'quince', label: 'Quince' },
  ];

  const showToast = useToastStore((state) => state.showToast); // eslint-disable-line react-hooks/rules-of-hooks

  const handleSuccess = () => {
    showToast('Operation successful!', 'success', 3000);
  };

  const handleFailure = () => {
    showToast('Operation failed!', 'warning', 3000);
  };

  const handleNormal = () => {
    showToast('This is a normal message', 'normal');
  };

  return (
    <div className='flex h-full w-full flex-col gap-4 bg-blue-200'>
      <div className='bg-gray-100'>
        <button onClick={handleNormal}>Show Normal Toast</button>
        <button onClick={handleSuccess}>Show Success Toast</button>
        <button onClick={handleFailure}>Show warning Toast</button>
      </div>

      {/* <Navbar /> */}
      <Calendar
        year={2024}
        month={9}
        data={calendarData}
        onDateClick={() => console.log('clicked')}
      />
      <div className='flex h-full w-full gap-4 bg-slate-300 p-4'>
        <Selectbox size='small' className='w-full' options={options} />
        <Selectbox size='basic' options={options} />
        <Selectbox size='large' options={options} />
      </div>

      <Table data={tableData2} />
      <Table data={tableData1} />
      <div className='flex items-end gap-4'>
        <Icon name='search' />
        <Badge imageSrc='/imgs/pi-gon-ping.jpg' />
      </div>

      <div className='flex items-end gap-4'>
        <Button variant='primary' size='small' width='fit'>
          SMALL PRIMARY
        </Button>
        <Button variant='primary' size='basic' width='fit'>
          BASIC PRIMARY
        </Button>
        <Button variant='primary' size='large' width='fit'>
          LARGE PRIMARY
        </Button>
      </div>
      <div className='flex items-end gap-4'>
        <Button variant='secondary' size='small' width='fit'>
          SMALL SECONDARY
        </Button>
        <Button variant='secondary' size='basic' width='fit'>
          BASIC SECONDARY
        </Button>
        <Button variant='secondary' size='large' width='fit'>
          LARGE SECONDARY
        </Button>
      </div>
      <div className='flex items-end gap-4'>
        <Button variant='outline' size='small' width='fit'>
          SMALL OUTLINE
        </Button>
        <Button variant='outline' size='basic' width='fit'>
          BASIC OUTLINE
        </Button>
        <Button variant='outline' size='large' width='fit'>
          LARGE OUTLINE
        </Button>
      </div>
    </div>
  );
};

export default page;
