import { useEffect, useState } from 'react';
import Button from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input';

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
    <div className='flex w-full flex-col gap-5'>
      <Button
        variant={'outline'}
        onClick={handleAddInput}
        className={successSubmit ? 'cursor-default' : ''}
      >
        질문 추가
      </Button>
      <ul className='flex flex-col gap-3'>
        {inputs.map((input, idx) => (
          <li key={idx} className='flex gap-3'>
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
        ))}
      </ul>
    </div>
  );
};

export default AdditionQuestions;
