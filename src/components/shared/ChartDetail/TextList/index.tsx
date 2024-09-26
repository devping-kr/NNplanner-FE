import { cn } from '@/utils/core';
import { CardTitle } from '@/components/common/Typography';

interface Props {
  list: string[];
  title: string;
  type: 'desireMenu' | 'message';
}
const TextList = ({ list, title, type }: Props) => {
  return (
    <div className='flex w-full flex-col gap-3 rounded border border-gray-300 bg-white-100 p-5'>
      <div className='border-b border-gray-200 pb-3'>
        <CardTitle>{title}</CardTitle>
      </div>
      <ul
        className={cn(
          'flex flex-col gap-2 overflow-y-auto pr-2',
          type === 'desireMenu' ? 'max-h-[310px]' : 'max-h-[600px]',
        )}
      >
        {list.map((text, idx) => (
          <li key={idx}>{text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TextList;
