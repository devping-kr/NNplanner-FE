import { CardTitle, HeadPrimary } from '@/components/common/Typography';

interface Props {
  title: string;
  top3Data: { responseDate: string; menu: string }[];
}

const TopCard = ({ top3Data, title }: Props) => {
  return (
    <div className='flex h-full flex-col gap-3'>
      <CardTitle>{title}</CardTitle>
      <div className='flex h-full w-full flex-col gap-3'>
        <div className='flex h-full gap-5'>
          {top3Data &&
            top3Data.map((menus) => (
              <div
                key={menus.responseDate}
                className='flex w-full flex-col items-center gap-4 rounded border border-gray-300 p-3 hover:border-green-500 active:border-green-600'
              >
                <span>{menus.responseDate}</span>
                <p className='text-center'>{menus.menu}</p>
              </div>
            ))}
          {top3Data && top3Data.length === 0 && (
            <div className='w-full p-3'>
              <HeadPrimary>제출된 설문이 없습니다.</HeadPrimary>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopCard;
