import { cn } from '@/utils/core';
import {
  Body2Black,
  HeadPrimary,
  SubTitle1Black,
} from '@/components/common/Typography';

interface Props {
  list: string[];
  title: string;
  type: 'desireMenu' | 'message';
}
const TextList = ({ list, title, type }: Props) => {
  return (
    <div className='flex w-full flex-col gap-6 rounded-2xl bg-white-100 p-6'>
      <SubTitle1Black>{title}</SubTitle1Black>
      <ul
        className={cn(
          'flex flex-col gap-2 overflow-y-auto pr-2',
          type === 'desireMenu' ? 'max-h-[310px]' : 'max-h-[600px]',
        )}
      >
        {list.length !== 0 &&
          list.map((text, idx) => (
            <li key={`${idx}-${text}`} className='h-6'>
              <Body2Black>{text}</Body2Black>
            </li>
          ))}
        {list.length === 0 && (
          <HeadPrimary>제출된 설문이 없습니다.</HeadPrimary>
        )}
      </ul>
    </div>
  );
};

export default TextList;
