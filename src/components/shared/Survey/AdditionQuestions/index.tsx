import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/core';
import Button from '@/components/common/Button/Button';
import Icon from '@/components/common/Icon';
import { Input } from '@/components/common/Input';
import { Selectbox } from '@/components/common/Selectbox';
import { CardTitle } from '@/components/common/Typography';
import { inputsType } from '@/components/feature/Survey/Create';
import { WARNING } from '@/constants/_toastMessage';
import { useToastStore } from '@/stores/useToastStore';

interface Props {
  inputs: inputsType[];
  setInputs: React.Dispatch<React.SetStateAction<inputsType[]>>;
  successSubmit: boolean;
}

const EXTRA_QUESTIONS_LIMIT = 7;

const ANSWER_TYPE = [
  { label: '선택형', value: 'radio' },
  { label: '서술형', value: 'text' },
];

const AdditionQuestions = ({ inputs, setInputs, successSubmit }: Props) => {
  const [prevInputCount, setPrevInputCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    if (inputs.length > prevInputCount && inputRef.current) {
      inputRef.current?.focus();
    }
    setPrevInputCount(inputs.length);
  }, [inputs]);

  const handleAddInput = () => {
    if (inputs.length >= EXTRA_QUESTIONS_LIMIT) {
      showToast(WARNING.maxAdditionQuestion, 'warning', 2000);
      return;
    }
    if (!successSubmit && inputs.length < EXTRA_QUESTIONS_LIMIT) {
      setInputs((prevInputs) => [
        ...prevInputs,
        { question: '', answerType: 'text', questionId: Math.random() },
      ]);
    }
  };

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const newInputs = [...inputs];
    newInputs[idx].question = e.target.value;
    setInputs(newInputs);
  };

  const handleChangeAnswerType = (type: string, idx: number) => {
    const newInputs = [...inputs];
    newInputs[idx].answerType = type;
    setInputs(newInputs);
  };

  const handleDeleteInput = (indexToDelete: number) => {
    !successSubmit &&
      setInputs((prevInputs) =>
        prevInputs.filter((_, index) => index !== indexToDelete),
      );
  };

  return (
    <div className='flex w-full flex-col gap-5 rounded border border-gray-300 bg-white-100 p-5'>
      <div className='flex items-center justify-between border-b border-gray-200 pb-2'>
        <CardTitle>추가 질문</CardTitle>
        <div className='w-24'>
          <Button
            onClick={handleAddInput}
            size='small'
            className={successSubmit ? 'cursor-default' : ''}
            disabled={successSubmit}
          >
            <Icon name='plus' width={15} height={15} color='white' />
            <span>질문 추가</span>
          </Button>
        </div>
      </div>
      <ul className='flex flex-col gap-3'>
        {inputs.length !== 0 ? (
          inputs.map((input, idx) => (
            <li key={input.questionId} className='flex gap-2'>
              <Input
                type='text'
                ref={idx === inputs.length - 1 ? inputRef : null}
                bgcolor='meal'
                value={input.question}
                onChange={(e) => handleChangeInput(e, idx)}
                readOnly={successSubmit}
                placeholder='추가 질문을 입력해주세요.'
              />
              <Selectbox
                size='small'
                options={ANSWER_TYPE}
                selectedValue={
                  input.answerType === 'text' ? '서술형' : '선택형'
                }
                placeholder='서술형'
                onChange={(type) => handleChangeAnswerType(type, idx)}
              />
              <div className='flex w-24'>
                <Button
                  size='small'
                  variant={'outline'}
                  onClick={() => handleDeleteInput(idx)}
                  className={cn('w-24', successSubmit ? 'cursor-default' : '')}
                >
                  질문 삭제
                </Button>
              </div>
            </li>
          ))
        ) : (
          <div className='text-center'>
            <CardTitle>추가 질문이 없습니다.</CardTitle>
          </div>
        )}
      </ul>
    </div>
  );
};

export default AdditionQuestions;
