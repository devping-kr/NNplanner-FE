import { useRef, useEffect } from 'react';
import { useModalStore } from '@/stores/modalStore';

interface ModalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  const { isOpen, closeModal } = useModalStore();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isOpen) {
      document.body.classList.add('overflow-hidden');
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = '0px';
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = '0px';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-dimmed'>
      <div
        ref={modalRef}
        className='left-1/2 top-1/2 rounded-2xl bg-white-100 p-6'
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
