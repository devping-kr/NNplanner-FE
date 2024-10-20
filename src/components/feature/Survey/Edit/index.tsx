'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { inputsType } from '@/components/feature/Survey/Create';
import AdditionQuestions from '@/components/shared/Survey/AdditionQuestions';
import SurveyControls from '@/components/shared/Survey/Controls';
import DefaultQuestions from '@/components/shared/Survey/DefaultQuestions';
import SurveyHeader from '@/components/shared/Survey/Header';
import { BASE_ROUTES } from '@/constants/_navbar';
import { surveyKeys } from '@/hooks/survey/queryKey';
import { useGetSurveyDetail } from '@/hooks/survey/useGetSurveyDetail';
import { usePutSurvey } from '@/hooks/survey/usePutSurvey';
import { useToastStore } from '@/stores/useToastStore';

interface Props {
  id: number;
}

const SurveyEdit = ({ id }: Props) => {
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.showToast);
  const { data: detailSurvey } = useGetSurveyDetail(id);

  const DefaultData = {
    questions:
      detailSurvey?.satisfactionDistributions?.map((item) => {
        return {
          questionId: item.questionId,
          question: item.questionText,
          answerType: item.answerType,
        };
      }) || [],
  };

  const [inputs, setInputs] = useState<inputsType[]>(DefaultData.questions);

  const { mutate } = usePutSurvey(id, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: surveyKeys.detail(id) });
      router.push(BASE_ROUTES.VIEW_CHART);
      showToast('설문 수정 성공', 'success', 1000);
    },
    onError: () => {
      showToast('설문 수정 실패', 'warning', 1000);
    },
  });

  const router = useRouter();

  const submitSurvey = () => {
    if (detailSurvey) {
      mutate({
        deadlineAt: '2024-10-20T12:00:00',
        surveyName: '수정된 설문',
        questions: inputs
          .filter((item) => item.questionId !== undefined)
          .map((item) => {
            return {
              questionId: item.questionId as number,
              question: item.question,
              answerType: item.answerType as 'text' | 'radio',
            };
          }),
      });
    }
  };

  return (
    detailSurvey && (
      <div className='flex flex-col gap-5'>
        <SurveyHeader
          title='설문 수정'
          accessBtnText='수정'
          accessHandler={submitSurvey}
        />
        <SurveyControls
          type='edit'
          surveyName={detailSurvey.surveyName}
          deadLine={detailSurvey.deadline}
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
    )
  );
};

export default SurveyEdit;
