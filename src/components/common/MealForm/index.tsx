import { FormEventHandler, ReactNode } from 'react';
import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
  FieldValues,
} from 'react-hook-form';

type MealFormProps<T extends FieldValues> = {
  legend: string;
  children: ReactNode;
  handleSubmit: UseFormHandleSubmit<T>;
  onSubmit?: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
};

const MealForm = <T extends FieldValues>({
  children,
  legend,
  handleSubmit,
  onSubmit,
  onError,
}: MealFormProps<T>) => {
  const submitHandler = () => {
    if (onSubmit && onError) {
      return handleSubmit(onSubmit, onError);
    } else if (onSubmit) {
      return handleSubmit(onSubmit);
    } else {
      return handleSubmit;
    }
  };

  return (
    <form onSubmit={submitHandler() as FormEventHandler<HTMLFormElement>}>
      <fieldset className='flex w-fit flex-col gap-4'>
        <legend className='sr-only'>{legend}</legend>
        {children}
      </fieldset>
    </form>
  );
};

export default MealForm;
