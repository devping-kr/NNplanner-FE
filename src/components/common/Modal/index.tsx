import { ComponentPropsWithoutRef } from 'react';
import Button from '../Button/Button';
import Icon from '../Icon';
import { IconColor, IconType } from '../Icon/assets';
import { BodyGray, HeadPrimary } from '../Typography';

export type Props = {
  title: string;
  content: string;
  acceptText: string;
  onAccept: () => void;
  color: IconColor;
  icon: IconType;
  isOpen: boolean;
  onClose: () => void;
  modalRef: React.Ref<HTMLDivElement>;
} & ComponentPropsWithoutRef<'div'>;

export const Modal = ({
  title,
  content,
  acceptText,
  onAccept,
  color,
  icon,
  isOpen,
  onClose,
  modalRef,
  ...modalProps
}: Props) => {
  if (!isOpen) return null;
  return (
    <div
      className='absolute left-0 top-0 z-50 flex size-full items-center justify-center bg-black bg-opacity-20'
      {...modalProps}
    >
      <div className='w-96 rounded-lg bg-white-100 p-5' ref={modalRef}>
        <div className='flex w-full flex-col items-center gap-4'>
          <Icon name={icon} color={color} width={50} height={50} />
          <div className='mb-4 flex w-full flex-col items-center gap-3 px-8'>
            <HeadPrimary>{title}</HeadPrimary>
            <BodyGray>{content}</BodyGray>
          </div>
          <div className='flex w-full gap-3 px-8'>
            <Button onClick={onClose} variant={'secondary'}>
              Cancel
            </Button>
            <Button
              onClick={onAccept}
              className='bg-warning-100 hover:bg-warning-200 active:bg-warning-300'
            >
              {acceptText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
