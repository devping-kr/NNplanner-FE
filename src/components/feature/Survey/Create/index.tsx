'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AdditionQuestions from '@/components/shared/Survey/AdditionQuestions';
import SurveyControls from '@/components/shared/Survey/Controls';
import DefaultQuestions from '@/components/shared/Survey/DefaultQuestions';
import SurveyHeader from '@/components/shared/Survey/Header';
import { NAV_LINKS } from '@/constants/_navbar';
import { useToastStore } from '@/stores/useToastStore';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/datepicker-custom.css';

const TWO_WEEK_DAYS = 14;
const twoWeeksLater = new Date();
twoWeeksLater.setDate(twoWeeksLater.getDate() + TWO_WEEK_DAYS);

const SurveyCreate = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState<string[]>([]);
  const [surveyName, setSurveyName] = useState('');
  const [deadLine, setDeadLine] = useState<Date | null>(twoWeeksLater);
  const { showToast } = useToastStore();

  // api 로직 완성 후 mutation isSuccess함수로 대체 예정
  const [successSubmit, setSuccessSubmit] = useState(false);

  const handleSurveyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurveyName(e.target.value);
  };

  const submitSurvey = () => {
    if (!surveyName) {
      showToast('설문 이름 입력은 필수입니다', 'warning', 2000);
      return;
    }
    setSuccessSubmit(true);
    router.push(NAV_LINKS[4].href);
  };

  return (
    <div className='flex flex-col gap-5'>
      <SurveyHeader
        title='설문 생성'
        accessBtnText='생성'
        accessHandler={submitSurvey}
      />
      <SurveyControls
        type='create'
        surveyName={surveyName}
        handleSurveyNameChange={handleSurveyNameChange}
        deadLine={deadLine}
        setDeadLine={setDeadLine}
      />
      <div className='flex gap-5'>
        <DefaultQuestions />
        <AdditionQuestions
          inputs={inputs}
          setInputs={setInputs}
          successSubmit={successSubmit}
        />
      </div>
    </div>
  );
};

export default SurveyCreate;
