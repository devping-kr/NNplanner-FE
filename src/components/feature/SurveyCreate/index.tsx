'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import Button from '@/components/common/Button/Button';
import Icon from '@/components/common/Icon';
import { Input } from '@/components/common/Input';
import {
  CardTitle,
  Label,
  MealCalenderTitle,
  PageHeaderTitle,
} from '@/components/common/Typography';
import AdditionQuestions from '@/components/shared/Survey/AdditionQuestions';
import DefaultQuestions from '@/components/shared/Survey/DefaultQuestions';
import { useToastStore } from '@/stores/useToastStore';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/datepicker-custom.css';

const imageInfo = {
  size: 245,
  src: '/imgs/pi-gon-ping.jpg',
};
const twoWeekDays = 14;
const domain = 'https://n-nplanner-fe.vercel.app/';
const today = new Date();
const twoWeeksLater = new Date();
twoWeeksLater.setDate(twoWeeksLater.getDate() + twoWeekDays);

const SurveyCreate = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState<string[]>([]);
  const [surveyTitle, setSurveyTitle] = useState('');
  const [deadLine, setDeadLine] = useState<Date | null>(twoWeeksLater);
  const inputRef = useRef(null);
  const deadLineDatePickerRef = useRef<DatePicker | null>(null);
  const { showToast } = useToastStore();

  // api 로직 완성 후 mutation isSuccess로직으로 대체 예정
  const [successSubmit, setSuccessSubmit] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurveyTitle(e.target.value);
  };

  const submitSurvey = () => {
    if (!surveyTitle) {
      showToast('설문 이름 입력은 필수입니다', 'warning', 2000);
      return;
    }
    showToast(
      '생성 성공! 하단의 QR코드와 도메인을 확인하세요',
      'success',
      2000,
    );
    setSuccessSubmit(true);
    // TODO: 성공했을때 설문조회리스트 페이지로 이동한다고 하면, disabled, readonly 설정 해제 가능
  };

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex justify-between'>
        <PageHeaderTitle>설문 생성</PageHeaderTitle>
        <div className='flex gap-3'>
          <Button onClick={submitSurvey} disabled={successSubmit} size='small'>
            설문 생성
          </Button>
          <Button
            variant={'secondary'}
            onClick={() => router.back()}
            size='small'
          >
            취소
          </Button>
        </div>
      </div>
      <div className='flex gap-4'>
        <div className='w-1/3'>
          <Input
            value={surveyTitle}
            onChange={handleTitleChange}
            readOnly={successSubmit}
            placeholder='설문 이름을 입력하세요.'
            className='font-semibold'
            bgcolor='meal'
            height='basic'
          />
        </div>
        <div className='relative flex w-1/2 max-w-fit items-center'>
          <Label>마감 일자</Label>
          <DatePicker
            ref={deadLineDatePickerRef}
            className='ml-2 cursor-pointer border-b border-green-400 bg-transparent pb-1 pl-1 focus:outline-none'
            shouldCloseOnSelect
            dateFormat='yyyy-MM-dd'
            selected={deadLine}
            locale={ko}
            minDate={today}
            onChange={(date) => {
              setDeadLine(date);
            }}
            readOnly={successSubmit}
            calendarClassName='custom-calendar'
            dayClassName={() => 'custom-day'}
            placeholderText='마감날짜 선택'
          />
          <button onClick={() => deadLineDatePickerRef.current!.setFocus()}>
            <Icon
              name='calendar'
              width={16}
              height={16}
              color='green'
              className='absolute bottom-3 right-2'
            />
          </button>
        </div>
      </div>
      <div className='flex flex-col gap-10'>
        <div className='flex gap-5'>
          <DefaultQuestions />
          <AdditionQuestions
            inputs={inputs}
            setInputs={setInputs}
            inputRef={inputRef}
            successSubmit={successSubmit}
          />
        </div>
        {successSubmit && (
          <div className='mb-3 flex items-center justify-center gap-16 rounded border border-gray-300 bg-white-100 p-5'>
            <div className='flex flex-col gap-3'>
              <CardTitle>설문 조사 링크</CardTitle>
              <Image
                src={imageInfo.src}
                width={imageInfo.size}
                height={imageInfo.size}
                alt='qr이미지'
              />
            </div>
            <div className='flex flex-col justify-center'>
              <CardTitle>설문 조사 도메인</CardTitle>
              <MealCalenderTitle>{domain}</MealCalenderTitle>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyCreate;
