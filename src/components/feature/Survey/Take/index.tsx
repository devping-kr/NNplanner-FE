'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getYearAndMonth, transformResponseToCalendar } from '@/utils/calendar';
import Button from '@/components/common/Button/Button';
import Calendar from '@/components/common/Calendar';
import { Input } from '@/components/common/Input';
import Radio from '@/components/common/Radio';
import {
  Body2Black,
  Body3Grey600,
  H2Black,
  SubTitle1Black,
  Subtitle1White,
} from '@/components/common/Typography';
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

const MANY_INPUT_INDEX = [4, 5, 6];

const SurveyTake = ({ id }: Props) => {
  const { navigate } = useNavigate();
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.showToast);
  const [answers, setAnswers] = useState<{
    [key: number]: number | string | string[];
  }>({});

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

  const handleChange = (
    questionId: number,
    value: number | string,
    idx: number,
    answerType: 'text' | 'radio',
    subIdx?: number,
  ) => {
    setAnswers((prev) => {
      if (answerType === 'radio') {
        return {
          ...prev,
          [questionId]: Number(value),
        };
      }

      if (MANY_INPUT_INDEX.includes(idx)) {
        const prevAnswers = (prev[questionId] as string[]) || ['', '', ''];
        const updatedAnswers = [...prevAnswers];
        if (subIdx !== undefined) {
          updatedAnswers[subIdx] = value as string;
        }
        return {
          ...prev,
          [questionId]: updatedAnswers,
        };
      }

      return {
        ...prev,
        [questionId]: value,
      };
    });
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
      <div className='flex w-full items-center justify-center rounded-2xl bg-white-100 p-6'>
        <Calendar
          data={calendarData}
          year={createdYear}
          month={createdMonth}
          readonly
        />
      </div>
      <ul className='mt-10 flex w-full flex-col gap-8 rounded-2xl bg-white-100 p-6'>
        <div className='flex items-center justify-between'>
          <SubTitle1Black>질문</SubTitle1Black>
          <Body3Grey600>1(매우 아니다) - 10(매우 그렇다)</Body3Grey600>
        </div>
        <div className='flex flex-col gap-8'>
          {surveyData?.mandatoryQuestions.map((question, idx) => (
            <div
              key={question.questionId}
              className='flex w-full flex-col gap-4'
            >
              <li className='flex items-center gap-1'>
                <Body2Black>{idx + 1}. </Body2Black>
                <Body2Black>{question.questionText}</Body2Black>
              </li>
              {question.answerType === 'text' &&
                !MANY_INPUT_INDEX.includes(idx) && (
                  <div className='h-16'>
                    <Input
                      variant='grey50'
                      size='m'
                      value={answers[question.questionId] || ''}
                      onChange={(e) =>
                        handleChange(
                          question.questionId,
                          e.target.value,
                          idx,
                          question.answerType,
                        )
                      }
                      placeholder='답변을 입력하세요.'
                    />
                  </div>
                )}
              {question.answerType === 'text' &&
                MANY_INPUT_INDEX.includes(idx) && (
                  <div>
                    {[0, 1, 2].map((subIdx) => (
                      <div key={subIdx} className='h-16'>
                        <Input
                          variant='grey50'
                          size='m'
                          value={
                            (answers[question.questionId] as string[])?.[
                              subIdx
                            ] || ''
                          }
                          onChange={(e) =>
                            handleChange(
                              question.questionId,
                              e.target.value,
                              idx,
                              question.answerType,
                              subIdx,
                            )
                          }
                          placeholder={`Top${subIdx + 1}`}
                        />
                      </div>
                    ))}
                  </div>
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
        </div>
        <div className='flex flex-col gap-8'>
          {surveyData?.additionalQuestions.map((question, idx) => (
            <div
              key={question.questionId}
              className='flex w-full flex-col gap-4'
            >
              <li className='flex items-center gap-1'>
                <Body2Black>{idx + 1}. </Body2Black>
                <Body2Black>{question.questionText}</Body2Black>
              </li>
              {question.answerType === 'text' && (
                <div className='h-16'>
                  <Input
                    variant='grey50'
                    size='m'
                    value={answers[question.questionId] || ''}
                    onChange={(e) =>
                      handleChange(
                        question.questionId,
                        e.target.value,
                        idx,
                        question.answerType,
                      )
                    }
                    placeholder='답변을 입력하세요.'
                  />
                </div>
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
        </div>
        <div className='flex w-full justify-end'>
          <div className='w-40'>
            <Button size='lg' onClick={submitSurvey} type='button' width='full'>
              <Subtitle1White>제출</Subtitle1White>
            </Button>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default SurveyTake;
