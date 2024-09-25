'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AdditionQuestions from '@/components/shared/Survey/AdditionQuestions';
import SurveyControls from '@/components/shared/Survey/Controls';
import DefaultQuestions from '@/components/shared/Survey/DefaultQuestions';
import SurveyHeader from '@/components/shared/Survey/Header';

// 아래 두개의 전역변수는 api완성 되면 데이터의 deadlineAt 날짜로 대체
const twoWeekDays = 14;
const twoWeeksLater = new Date();
twoWeeksLater.setDate(twoWeeksLater.getDate() + twoWeekDays);

// api를 통해 받아온 기존 설문데이터 추후 교체
const DefaultData = {
  deadlineAt: twoWeeksLater,
  surveyName: '2024년 8월 급식 만족도 설문',
  questions: [
    '반찬의 양에 얼마나 만족하시나요?',
    '채식 메뉴를 더 추가했으면 좋겠습니까?',
    '디저트의 종류를 다양화했으면 좋겠습니까?',
  ],
};

const SurveyEdit = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState<string[]>(DefaultData.questions);

  const submitSurvey = () => {
    router.push('/viewChart');
  };

  return (
    <div className='flex flex-col gap-5'>
      <SurveyHeader
        title='설문 수정'
        accessBtnText='수정'
        accessHandler={submitSurvey}
      />
      <SurveyControls
        type='edit'
        surveyName={DefaultData.surveyName}
        deadLine={DefaultData.deadlineAt}
      />
      <div className='flex gap-5'>
        <DefaultQuestions />
        <AdditionQuestions
          inputs={inputs}
          setInputs={setInputs}
          successSubmit={false}
        />
      </div>
    </div>
  );
};

export default SurveyEdit;
