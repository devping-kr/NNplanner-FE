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
    <form onSubmit={submitHandler}>
      <fieldset className='flex w-fit flex-col gap-4'>
        <legend className='sr-only'>{legend}</legend>
        {children}
      </fieldset>
    </form>
  );
};

export default MealForm;
