import { CardTitle, HeadPrimary } from '@/components/common/Typography';

interface Props {
  title: string;
  top3Data: string[] | null;
}

const TopCard = ({ top3Data, title }: Props) => {
  return (
    <div className='flex h-full flex-col gap-3'>
      <CardTitle>{title}</CardTitle>
      <div className='flex h-full w-full flex-col gap-3'>
        <div className='flex h-full gap-5'>
          {top3Data &&
            top3Data
              .map((menu) => (
                <div
                  key={menu}
                  className='flex w-full flex-col items-center gap-4 rounded border border-gray-300 p-3 hover:border-green-500 active:border-green-600'
                >
                  <p className='text-center'>{menu}</p>
                </div>
              ))
              // TODO: top3식단 3개만 받을 수 있게끔 api 수정후 삭제 예정
              .slice(0, 3)}
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
