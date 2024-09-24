import { useEffect, useState } from 'react';
import Button from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input';
import { CardTitle } from '@/components/common/Typography';

interface Props {
  inputs: string[];
  setInputs: React.Dispatch<React.SetStateAction<string[]>>;
  inputRef: React.RefObject<HTMLInputElement>;
  successSubmit: boolean;
}

const AdditionQuestions = ({
  inputs,
  setInputs,
  inputRef,
  successSubmit,
}: Props) => {
  const [prevInputCount, setPrevInputCount] = useState(0);

  useEffect(() => {
    if (inputs.length > prevInputCount && inputRef.current) {
      inputRef.current.focus();
    }
    setPrevInputCount(inputs.length);
  }, [inputs]);

  const handleAddInput = () => {
    !successSubmit && setInputs((prevInputs) => [...prevInputs, '']);
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
      <div className='flex items-center'>
        <div className='w-full'>
          <CardTitle>추가 질문</CardTitle>
        </div>
        <Button
          onClick={handleAddInput}
          size='small'
          width='fit'
          className={successSubmit ? 'cursor-default' : ''}
          disabled={successSubmit}
        >
          + 질문 추가
        </Button>
      </div>
      <ul className='flex flex-col gap-3'>
        {inputs.length !== 0 ? (
          inputs.map((input, idx) => (
            <li key={idx} className='flex gap-2'>
              <Input
                type='text'
                ref={idx === inputs.length - 1 ? inputRef : null}
                value={input}
                onChange={(e) => handleChangeInput(e, idx)}
                readOnly={successSubmit}
              />
              <Button
                size='small'
                width='fit'
                variant={'outline'}
                onClick={() => handleDeleteInput(idx)}
                className={successSubmit ? 'cursor-default' : ''}
              >
                질문 삭제
              </Button>
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
