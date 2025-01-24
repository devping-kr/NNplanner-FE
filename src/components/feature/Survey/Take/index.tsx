'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getYearAndMonth, transformResponseToCalendar } from '@/utils/calendar';
import Button from '@/components/common/Button/Button';
import Calendar from '@/components/common/Calendar';
import { Input } from '@/components/common/Input';
import Radio from '@/components/common/Radio';
import { CardTitle, H2Black } from '@/components/common/Typography';
import { BASE_ROUTES } from '@/constants/_navbar';
import { useGetMonthMenuDetails } from '@/hooks/menu/useGetMonthMenuDetail';
import { surveyKeys } from '@/hooks/survey/queryKey';
import { useGetSurveyDetail } from '@/hooks/survey/useGetSurveyDetail';
import { usePostSurveyResponses } from '@/hooks/survey/usePostSurveyResponses';
import useNavigate from '@/hooks/useNavigate';
import { useToastStore } from '@/stores/useToastStore';

interface Props {
  id: number;
}

const RADIO_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const SurveyTake = ({ id }: Props) => {
  const { navigate } = useNavigate();
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.showToast);
  const [answers, setAnswers] = useState<{ [key: number]: number | string }>(
    {},
  );

  const { data: surveyData } = useGetSurveyDetail(id);
  const { data: monthMenuData, isLoading } = useGetMonthMenuDetails(
    { monthMenuId: surveyData?.mmId as string },
    {
      enabled: !!surveyData?.mmId,
    },
  );

  const { mutate } = usePostSurveyResponses(id, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: surveyKeys.detail(id) });
      navigate(`${BASE_ROUTES.VIEW_CHART}/${id}`);
      showToast('설문 응답 성공', 'success', 1000);
    },
    onError: () => {
      showToast('설문 응답 실패', 'warning', 1000);
    },
  });

  const monthMenuDetail = monthMenuData?.data;

  if (isLoading || !monthMenuDetail) {
    return <div>Loading...</div>;
  }

  const { year: createdYear, month: createdMonth } = getYearAndMonth(
    monthMenuDetail.createAt,
  );

  const handleChange = (questionId: number, value: number | string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const submitSurvey = () => {
    const formattedBasicAnswers = Object.entries(answers)
      .slice(0, 8)
      .map(([questionId, answer], index) => ({
        questionId: Number(questionId),
        answer: [4, 5, 6].includes(index) ? [String(answer)] : answer,
      }));

    const formattedAdditionalAnswers = Object.entries(answers)
      .slice(8)
      .map(([questionId, answer]) => ({
        questionId: Number(questionId),
        answer,
      }));

    mutate({
      basicQuestions: formattedBasicAnswers,
      additionalQuestions: formattedAdditionalAnswers,
    });
  };

  const calendarData = transformResponseToCalendar(
    createdYear,
    createdMonth,
    monthMenuDetail.monthMenuList,
    'detail',
  );

  return (
    <div className='flex w-full flex-col items-start gap-5'>
      <H2Black>{surveyData?.surveyName}</H2Black>
      <Calendar
        data={calendarData}
        year={createdYear}
        month={createdMonth}
        readonly
      />
      <ul className='mt-10 flex w-[calc(100%-20px)] max-w-[1224px] flex-col gap-3 rounded-sm bg-white-100 p-6'>
        <div className='flex items-center justify-between'>
          <CardTitle>질문</CardTitle>
          <span className='text-sm text-gray-600'>
            1(매우 아니다) - 10(매우 그렇다)
          </span>
        </div>
        {surveyData?.mandatoryQuestions.map((question, idx) => (
          <div
            key={question.questionId}
            className='flex w-full flex-col gap-1 border-b border-gray-300 pb-3'
          >
            <li className='flex items-center gap-1'>
              <span>{idx + 1}. </span>
              <span>{question.questionText}</span>
            </li>
            {question.answerType === 'text' && (
              <Input
                value={answers[question.questionId] || ''}
                bgcolor='meal'
                onChange={(e) =>
                  handleChange(question.questionId, e.target.value)
                }
              />
            )}
            {question.answerType === 'radio' && (
              <div className='flex justify-around'>
                {RADIO_OPTIONS.map((option) => (
                  <div key={option}>
                    <Radio
                      option={option}
                      answers={answers}
                      handleChange={handleChange}
                      question={question}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {surveyData?.additionalQuestions.map((question, idx) => (
          <div
            key={question.questionId}
            className='flex w-full flex-col gap-1 border-b border-gray-300 pb-3'
          >
            <li className='flex items-center gap-1'>
              <span>{idx + 1}. </span>
              <span>{question.questionText}</span>
            </li>
            {question.answerType === 'text' && (
              <Input
                value={answers[question.questionId] || ''}
                bgcolor='meal'
                onChange={(e) =>
                  handleChange(question.questionId, e.target.value)
                }
              />
            )}
            {question.answerType === 'radio' && (
              <div className='flex justify-around'>
                {RADIO_OPTIONS.map((option) => (
                  <div key={option}>
                    <Radio
                      option={option}
                      answers={answers}
                      handleChange={handleChange}
                      question={question}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className='my-4 w-full'>
          <Button onClick={submitSurvey} type='button'>
            제출
          </Button>
        </div>
      </ul>
    </div>
  );
};

export default SurveyTake;
