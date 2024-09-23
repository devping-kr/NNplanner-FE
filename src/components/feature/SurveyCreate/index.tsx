'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Input } from '@/components/common/Input';
import {
  CardTitle,
  NutritionEtc,
  PageHeaderTitle,
} from '@/components/common/Typography';
import AdditionQuestions from '@/components/shared/Survey/AdditionQuestions';
import DefaultQuestions from '@/components/shared/Survey/DefaultQuestions';
import { useToastStore } from '@/stores/useToastStore';

const imageInfo = {
  size: 245,
  src: '/imgs/pi-gon-ping.jpg',
};

const domain = 'https://n-nplanner-fe.vercel.app/';

const SurveyCreate = () => {
  const [inputs, setInputs] = useState<string[]>([]);
  const [surveyTitle, setSurveyTitle] = useState('');
  const inputRef = useRef(null);
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
    console.log('설문 생성!');
    setSuccessSubmit(true);
    // TODO: 성공했을때 설문조회리스트 페이지로 이동
  };

  return (
    <div className='flex w-full flex-col gap-5'>
      <PageHeaderTitle>설문 생성</PageHeaderTitle>
      <Input
        value={surveyTitle}
        onChange={handleTitleChange}
        readOnly={successSubmit}
        placeholder='설문 이름을 입력하세요.'
        className='text-2xl font-semibold'
        bgcolor='meal'
        height='large'
      />
      <div className='flex w-full gap-10'>
        <div className='flex w-full flex-col gap-5'>
          <div className='flex flex-col gap-5'>
            <DefaultQuestions submitSurvey={submitSurvey} />
            <AdditionQuestions
              inputs={inputs}
              setInputs={setInputs}
              inputRef={inputRef}
              successSubmit={successSubmit}
            />
          </div>
        </div>
        <div className='w-full'>
          {successSubmit && (
            <div className='mb-3 flex gap-10 rounded border border-gray-300 bg-white-100 p-5'>
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
                <NutritionEtc>{domain}</NutritionEtc>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyCreate;
