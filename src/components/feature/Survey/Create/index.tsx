'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FailResponse, Result } from '@/type/response';
import { SurveyPostResponse } from '@/type/survey/surveyResponse';
import { getCurrentYearMonthNow } from '@/utils/calendar';
import AdditionQuestions from '@/components/shared/Survey/AdditionQuestions';
import SurveyControls from '@/components/shared/Survey/Controls';
import DefaultQuestions from '@/components/shared/Survey/DefaultQuestions';
import SurveyHeader from '@/components/shared/Survey/Header';
import { NAV_LINKS } from '@/constants/_navbar';
import { WARNING } from '@/constants/_toastMessage';
import { surveyKeys } from '@/hooks/survey/queryKey';
import { usePostSurvey } from '@/hooks/survey/usePostSurvey';
import { useToastStore } from '@/stores/useToastStore';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/datepicker-custom.css';

const EXTRA_SURVEYNAME_LIMIT = 30;
const TWO_WEEK_DAYS = 14;
const { now: twoWeeksLater } = getCurrentYearMonthNow();
twoWeeksLater.setDate(twoWeeksLater.getDate() + TWO_WEEK_DAYS);

export interface inputsType {
  question: string;
  answerType: string;
}

const SurveyCreate = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: postSurveyMutate, isSuccess: postSurveySuccess } =
    usePostSurvey();
  const [inputs, setInputs] = useState<inputsType[]>([]);
  const [surveyName, setSurveyName] = useState('');
  const [deadLine, setDeadLine] = useState<Date | null>(twoWeeksLater);
  const showToast = useToastStore((state) => state.showToast);

  const requestData = {
    // TODO: mmId searchParam으로 가져온 값으로 수정예정
    mmId: '8ebee81d-de92-4c40-bd42-52e95138e94d',
    surveyName: surveyName,
    deadlineAt: deadLine,
    additionalQuestions: inputs,
  };

  const handleSurveyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= EXTRA_SURVEYNAME_LIMIT) {
      setSurveyName(e.target.value);
    }
  };

  const submitSurvey = () => {
    if (!surveyName) {
      showToast(WARNING.requiredSurveyName, 'warning', 2000);
      return;
    }
    postSurveyMutate(requestData, {
      onSuccess: ({ message }: Result<SurveyPostResponse>) => {
        showToast(message, 'success', 1000);
        queryClient.invalidateQueries({ queryKey: surveyKeys.search() });
        router.replace(NAV_LINKS[4].href);
      },
      onError: (error: AxiosError<FailResponse>) => {
        const errorMessage = error.response?.data?.message || '설문 생성 실패';
        showToast(errorMessage, 'warning', 1000);
      },
    });
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
          successSubmit={postSurveySuccess}
        />
      </div>
    </div>
  );
};

export default SurveyCreate;
