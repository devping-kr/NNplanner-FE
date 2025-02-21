import Badge from '@/components/common/Badge';
import {
  Body2Assistive,
  Body2Black,
  SubTitle1Black,
} from '@/components/common/Typography';

interface Props {
  title: string;
  top3Data: string[] | null;
  type: 'like' | 'unlike';
}

const TopCard = ({ top3Data, title, type }: Props) => {
  return (
    <div className='flex w-full flex-col gap-6 rounded-2xl bg-white-100 p-6'>
      <SubTitle1Black>{title}</SubTitle1Black>
      <div className='flex w-full flex-col justify-center gap-4'>
        {top3Data &&
          top3Data
            .map((menu, idx) => (
              <div key={menu} className='flex w-full items-center gap-6'>
                <Badge
                  text={`Top ${idx + 1}`}
                  textType='subtitle'
                  size='m'
                  variant={type === 'like' ? 'blue' : 'red'}
                />
                <div className='flex items-center gap-1'>
                  <Body2Black>02/20</Body2Black>
                  <Body2Black>{menu}</Body2Black>
                </div>
              </div>
            ))
            // TODO: top3식단 3개만 받을 수 있게끔 api 수정후 삭제 예정
            .slice(0, 3)}
        {top3Data && top3Data.length === 0 && (
          <div className='flex min-h-[120px] w-full items-center justify-center'>
            <Body2Assistive>제출된 설문이 없습니다.</Body2Assistive>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopCard;
