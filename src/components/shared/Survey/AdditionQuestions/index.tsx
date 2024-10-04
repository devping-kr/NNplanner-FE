import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/core';
import Button from '@/components/common/Button/Button';
import Icon from '@/components/common/Icon';
import { Input } from '@/components/common/Input';
import { CardTitle } from '@/components/common/Typography';
import { useToastStore } from '@/stores/useToastStore';

interface Props {
  inputs: string[];
  setInputs: React.Dispatch<React.SetStateAction<string[]>>;
  successSubmit: boolean;
}

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
    if (inputs.length > 6)
      showToast('추가 질문은 최대 7개까지 생성 가능합니다.', 'warning', 2000);
    if (!successSubmit && inputs.length <= 6) {
      setInputs((prevInputs) => [...prevInputs, '']);
    }
  };

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const newInputs = [...inputs];
    newInputs[idx] = e.target.value;
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
            <li key={`input${idx}-${idx}`} className='flex gap-2'>
              <Input
                type='text'
                ref={idx === inputs.length - 1 ? inputRef : null}
                bgcolor='meal'
                value={input}
                onChange={(e) => handleChangeInput(e, idx)}
                readOnly={successSubmit}
                placeholder='추가 질문을 입력해주세요.'
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
