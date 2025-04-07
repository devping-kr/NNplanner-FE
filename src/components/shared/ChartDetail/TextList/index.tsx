import { cn } from '@/utils/core';
import {
  Body2Assistive,
  Body2Black,
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
          'flex flex-col overflow-y-auto',
          type === 'desireMenu' ? 'max-h-[242px] gap-4' : 'max-h-[600px] gap-2',
        )}
      >
        {list.length !== 0 &&
          list.map((text, idx) => (
            <li key={`${idx}-${text}`} className='h-6'>
              <Body2Black>{text}</Body2Black>
            </li>
          ))}
        {list.length === 0 && (
          <div className='flex min-h-[130px] w-full items-center justify-center'>
            <Body2Assistive>제출된 설문이 없습니다.</Body2Assistive>
          </div>
        )}
      </ul>
    </div>
  );
};

export default TextList;
