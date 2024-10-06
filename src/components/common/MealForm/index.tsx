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
  handleSubmit: UseFormHandleSubmit<T> | FormEventHandler<HTMLFormElement>;
  onSubmit?: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
};

const MealForm = <T extends FieldValues>({
  legend,
  children,
  handleSubmit,
  onSubmit,
  onError,
}: MealFormProps<T>) => {
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit
      ? (handleSubmit as UseFormHandleSubmit<T>)(onSubmit, onError)(event)
      : (handleSubmit as FormEventHandler<HTMLFormElement>)(event);
  };

  return (
    <form onSubmit={submitHandler}>
      <fieldset className='flex w-fit flex-col gap-4'>
        <legend className='sr-only'>{legend}</legend>
        {children}
      </fieldset>
    </form>
  );
};

export default MealForm;
