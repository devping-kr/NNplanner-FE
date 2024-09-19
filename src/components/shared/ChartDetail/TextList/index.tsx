import { cn } from '@/utils/core';
import { CardTitle } from '@/components/common/Typography';

interface Props {
  list: string[];
  title: string;
  type: 'desireMenu' | 'message';
}
const TextList = ({ list, title, type }: Props) => {
  return (
    <div className='flex h-full flex-col gap-3'>
      <CardTitle>{title}</CardTitle>
      <ul
        className={cn(
          'flex h-full flex-col gap-2 overflow-y-auto rounded border border-gray-300 p-3',
          type === 'desireMenu' ? 'max-h-[300px]' : 'max-h-[590px]',
        )}
      >
        {list.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TextList;
