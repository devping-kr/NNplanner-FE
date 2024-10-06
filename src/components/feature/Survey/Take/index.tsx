'use client';

import { useState } from 'react';
import Button from '@/components/common/Button/Button';
import Calendar from '@/components/common/Calendar';
import { Input } from '@/components/common/Input';
import { CardTitle, HeadPrimary } from '@/components/common/Typography';
import { MOCK_CALENDAR_NUTRITION } from '@/constants/_calendarData';

interface Props {
  id: number;
}

const RADIO_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const MOCK_SURVEY_DATA = [
  {
    questionId: 101,
    question: '반찬의 양에 얼마나 만족하시나요?',
    isMandatory: true,
    type: 'text',
  },
  {
    questionId: 102,
    question: '채식 메뉴를 더 추가했으면 좋겠습니까?',
    isMandatory: false,
    type: 'radio',
  },
  {
    questionId: 103,
    question: '디저트의 종류를 다양화했으면 좋겠습니까?',
    isMandatory: false,
    type: 'radio',
  },
  {
    questionId: 104,
    question: '반찬의 양에 얼마나 만족하시나요?',
    isMandatory: true,
    type: 'text',
  },
  {
    questionId: 105,
    question: '채식 메뉴를 더 추가했으면 좋겠습니까?',
    isMandatory: false,
    type: 'text',
  },
  {
    questionId: 106,
    question: '디저트의 종류를 다양화했으면 좋겠습니까?',
    isMandatory: false,
    type: 'text',
  },
  {
    questionId: 107,
    question: '반찬의 양에 얼마나 만족하시나요?',
    isMandatory: true,
    type: 'radio',
  },
  {
    questionId: 108,
    question: '채식 메뉴를 더 추가했으면 좋겠습니까?',
    isMandatory: false,
    type: 'radio',
  },
  {
    questionId: 109,
    question: '디저트의 종류를 다양화했으면 좋겠습니까?',
    isMandatory: false,
    type: 'text',
  },
];

const SurveyTake = ({ id }: Props) => {
  // api surveyId로 활용 예정
  console.log(id);

  const [answers, setAnswers] = useState<{ [key: number]: number | string }>(
    {},
  );

  const isFormComplete = MOCK_SURVEY_DATA.every((question) => {
    if (question.isMandatory) {
      return (
        answers[question.questionId] !== undefined &&
        answers[question.questionId] !== ''
      );
    }
    return true;
  });

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const handleChange = (questionId: number, value: number | string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  return (
    <div className='flex w-full flex-col items-start gap-5 px-44'>
      <HeadPrimary>8월 식단 설문</HeadPrimary>
      <Calendar
        data={MOCK_CALENDAR_NUTRITION}
        year={year}
        month={month}
        readonly
      />
      <ul className='mt-10 flex w-[calc(100%-20px)] flex-col gap-3 rounded-sm bg-white-100 p-6'>
        <CardTitle>질문</CardTitle>
        {MOCK_SURVEY_DATA.map((question, idx) => (
          <div
            key={question.questionId}
            className='flex w-full flex-col gap-1 border-b border-gray-300 pb-3'
          >
            <li className='flex items-center gap-1'>
              <span>{`${idx + 1}. `}</span>
              <span>{question.question}</span>
              <span
                className={question.isMandatory ? 'text-red-200' : 'hidden'}
              >
                *
              </span>
            </li>
            {question.type === 'text' ? (
              <Input
                value={answers[question.questionId] || ''}
                bgcolor='meal'
                onChange={(e) =>
                  handleChange(question.questionId, e.target.value)
                }
              />
            ) : (
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
          <Button disabled={!isFormComplete}>제출</Button>
        </div>
      </ul>
    </div>
  );
};

export default SurveyTake;
