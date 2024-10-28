'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getCurrentYearMonthNow } from '@/utils/calendar';
import Button from '@/components/common/Button/Button';
import Calendar from '@/components/common/Calendar';
import { Input } from '@/components/common/Input';
import { CardTitle, HeadPrimary } from '@/components/common/Typography';
import { MOCK_NEW_CALENDAR_NUTRITION } from '@/constants/_calendarData';
import { BASE_ROUTES } from '@/constants/_navbar';
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
  const queryClient = useQueryClient();
  const { navigate } = useNavigate();
  const showToast = useToastStore((state) => state.showToast);
  const { data: surveyData } = useGetSurveyDetail(id);

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

  console.log(surveyData);
  const [answers, setAnswers] = useState<{ [key: number]: number | string }>(
    {},
  );
  console.log(answers);
  const { month, year } = getCurrentYearMonthNow();

  const handleChange = (questionId: number, value: number | string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const submitSurvey = () => {
    mutate({
      basicQuestions: [
        { questionId: 10, answer: 8 },
        { questionId: 11, answer: 2 },
        { questionId: 12, answer: 3 },
        { questionId: 13, answer: 6 },
        { questionId: 14, answer: ['test', 'test', 'test'] },
        { questionId: 15, answer: ['test2', 'test2', 'test2'] },
        { questionId: 16, answer: 'test3' },
        { questionId: 17, answer: 'test4' },
      ],
      additionalQuestions: [
        { questionId: 18, answer: 'test5' },
        { questionId: 19, answer: 4 },
      ],
    });
  };

  return (
    <div className='flex w-full flex-col items-start gap-5 px-44'>
      <div className='mb-9 flex w-[calc(100%-20px)] justify-center'>
        <HeadPrimary>8월 식단 설문</HeadPrimary>
      </div>
      <Calendar
        data={MOCK_NEW_CALENDAR_NUTRITION}
        year={year}
        month={month}
        readonly
      />
      <ul className='mt-10 flex w-[calc(100%-20px)] max-w-[1224px] flex-col gap-3 rounded-sm bg-white-100 p-6'>
        <div className='flex items-center justify-between'>
          <CardTitle>질문</CardTitle>
          <span className='text-sm text-gray-600'>
            1(매우 아니다) - 10(매우 그렇다)
          </span>
        </div>
        {surveyData?.satisfactionDistributions.map((question, idx) => (
          <div
            key={question.questionId}
            className='flex w-full flex-col gap-1 border-b border-gray-300 pb-3'
          >
            <li className='flex items-center gap-1'>
              <span>{idx + 1}. </span>
              <span>{question.questionText}</span>
              {/* <span
                className={question.isMandatory ? 'text-red-200' : 'hidden'}
              >
                *
              </span> */}
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
                  <div key={option} className='flex gap-2'>
                    <input
                      type='radio'
                      name={`question${question.questionId}`}
                      id={`${question.questionId}_${option}`}
                      value={option}
                      checked={answers[question.questionId] === option}
                      onChange={() => handleChange(question.questionId, option)}
                    />
                    <label htmlFor={`${question.questionId}_${option}`}>
                      {option}
                    </label>
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
