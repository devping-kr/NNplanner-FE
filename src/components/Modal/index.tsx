import { ComponentPropsWithoutRef } from 'react';
import Icon from '../Icon';
import { HeadPrimary } from '../Typography/Typography';

export type Props = {
  isOpen: boolean;
  showCloseButton?: boolean;
  onClose: () => void;
  modalRef: React.Ref<HTMLDivElement>;
  title: string;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export const Modal = ({
  title,
  isOpen,
  onClose,
  modalRef,
  showCloseButton = true,
  children,
  ...modalProps
}: Props) => {
  if (!isOpen) return null;
  return (
    <div
      className='absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-20'
      {...modalProps}
    >
      <div
        className='w-[90%] max-w-[400px] rounded-xl bg-primary p-5'
        ref={modalRef}
      >
        <div className='flex items-center justify-between'>
          <HeadPrimary>{title}</HeadPrimary>
          {showCloseButton && (
            <div onClick={onClose} className='cursor-pointer'>
              <Icon name='xmark' width={15} height={15} />
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};
