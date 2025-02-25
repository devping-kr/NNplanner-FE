import { FormEvent, FormEventHandler, ReactNode } from 'react';
import {
  SubmitErrorHandler,
  SubmitHandler,
  FieldValues,
} from 'react-hook-form';

type MealFormProps<T extends FieldValues> = {
  legend: string;
  children: ReactNode;
  handleSubmit:
    | ((
        onSubmit?: SubmitHandler<T>,
        onError?: SubmitErrorHandler<T>,
      ) => FormEventHandler<HTMLFormElement>)
    | FormEventHandler<HTMLFormElement>;
};

const MealForm = <T extends FieldValues>({
  legend,
  children,
  handleSubmit,
}: MealFormProps<T>) => {
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (handleSubmit.length === 2) {
      return (
        handleSubmit as (
          onSubmit?: SubmitHandler<T>,
          onError?: SubmitErrorHandler<T>,
        ) => FormEventHandler<HTMLFormElement>
      )()(event);
    } else {
      return (handleSubmit as FormEventHandler<HTMLFormElement>)(event);
    }
  };

  return (
    <form onSubmit={submitHandler} className='w-full'>
      <fieldset className='flex w-full flex-col gap-6'>
        <legend className='sr-only'>{legend}</legend>
        {children}
      </fieldset>
    </form>
  );
};

export default MealForm;
