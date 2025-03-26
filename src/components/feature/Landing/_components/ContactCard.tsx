'use client';

import { useRef } from 'react';
import { env } from '@/lib/env';
import { sendForm } from '@emailjs/browser';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { mailSchema } from '@/schema/mailSchema';
import { MailRequest } from '@/type/contact/contactRequest';
import Button from '@/components/common/Button/Button';
import Icon from '@/components/common/Icon';
import { Input } from '@/components/common/Input';
import { Selectbox } from '@/components/common/Selectbox';
import {
  Caption1Placeholder,
  H5White,
  Label1Grey900,
} from '@/components/common/Typography';
import { useToastStore } from '@/stores/useToastStore';

const ContactCard = () => {
  const showToast = useToastStore((state) => state.showToast);
  const mailForm = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm<MailRequest>({
    resolver: zodResolver(mailSchema),
    mode: 'onChange',
    defaultValues: {
      user_name: '',
      message: '',
      user_email: '',
      kind: '',
    },
  });

  const onSubmit: SubmitHandler<MailRequest> = () => {
    if (!mailForm.current) return;

    sendForm(
      env.SERVICE_ID as string,
      env.TEMPLATE_ID as string,
      mailForm.current,
      {
        publicKey: env.EMAILJS_PUBLIC_KEY,
      },
    )
      .then(() => {
        showToast('메일 전송이 성공적으로 완료되었습니다.', 'success', 1000);
      })
      .catch((error) => {
        const errorMessage =
          typeof error === 'string'
            ? error
            : error?.message || '메일 전송 중 오류가 발생했습니다.';

        showToast(errorMessage, 'warning', 1000);
      });
  };

  const messageLength = watch('message').replace(
    /[\0-\x7f]|([0-\u07ff]|(.))/g,
    '$&$1$2',
  ).length;

  return (
    <form
      ref={mailForm}
      className='flex items-end gap-8'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex w-[488px] flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          <Label1Grey900 htmlFor='user_name'>이름</Label1Grey900>
          <div className='h-16'>
            <Input
              id='user_name'
              type='text'
              placeholder='이름을 입력해 주세요.'
              size='m'
              variant='white'
              {...register('user_name')}
            />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <Label1Grey900 htmlFor='user_email'>연락 받으실 이메일</Label1Grey900>
          <div className='h-16'>
            <Input
              id='user_email'
              type='text'
              placeholder='이메일을 입력해 주세요.'
              size='m'
              variant='white'
              {...register('user_email')}
            />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <Label1Grey900 htmlFor='kind'>문의 유형</Label1Grey900>
          <Selectbox className='flex h-16 justify-start' />
        </div>
      </div>
      <div className='relative flex h-[318px] w-[488px] flex-col gap-2'>
        <Caption1Placeholder className='absolute bottom-5 right-5'>
          {messageLength} / 600
        </Caption1Placeholder>
        <Label1Grey900>최대(600자)</Label1Grey900>
        <textarea
          className='h-[292px] w-full resize-none rounded-lg p-4 outline-none'
          placeholder='내용을 입력해 주세요.'
          {...register('message', { maxLength: 600 })}
        ></textarea>
      </div>
      <div className='flex h-40 w-40 items-center justify-center'>
        <Button
          disabled={!isValid}
          variant='primary'
          width='full'
          className='flex h-40 flex-col items-center justify-center rounded-full'
          type='submit'
        >
          <Icon name='arrowRight' width={24} height={24} color='white' />
          <H5White>작성 완료</H5White>
        </Button>
      </div>
    </form>
  );
};

export default ContactCard;
