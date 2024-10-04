import { FormEventHandler, ReactNode } from 'react';
import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { MealHeaderFormData } from '@/components/shared/Meal/MealHeader';

type MealFormProps = {
  legend: string;
  children: ReactNode;
  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>,
  ) => void | UseFormHandleSubmit<MealHeaderFormData>;
  onSubmit?: SubmitHandler<MealHeaderFormData>;
  onError?: SubmitErrorHandler<MealHeaderFormData>;
};

const MealForm = ({
  children,
  legend,
  handleSubmit,
  onSubmit,
  onError,
}: MealFormProps) => {
  const submitHandler = onSubmit
    ? handleSubmit(onSubmit, onError)
    : handleSubmit;
  return (
    <form onSubmit={submitHandler as FormEventHandler<HTMLFormElement>}>
      <fieldset className='flex w-fit flex-col gap-4'>
        <legend className='sr-only'>{legend}</legend>
        {children}
      </fieldset>
    </form>
  );
};

export default MealForm;
