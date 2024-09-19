import { CardTitle } from '@/components/common/Typography';

interface Props {
  averageScores: {
    totalSatisfaction: number;
    portionSatisfaction: number;
    hygieneSatisfaction: number;
    tasteSatisfaction: number;
  };
}
const scoreTitleTranslations: { [key: string]: string } = {
  totalSatisfaction: '총 만족도',
  portionSatisfaction: '양 만족도',
  hygieneSatisfaction: '위생 만족도',
  tasteSatisfaction: '맛 만족도',
};

const AverageCard = ({ averageScores }: Props) => {
  return (
    <div className='flex w-full flex-col gap-3'>
      <CardTitle>만족도 평균</CardTitle>
      <div className='flex w-full flex-col border border-gray-300 p-4'>
        {Object.entries(averageScores).map(([kind, score]) => (
          <div key={kind}>
            <h3 className='font-semibold'>{scoreTitleTranslations[kind]}</h3>
            <p className='text-xl font-bold'>{score}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AverageCard;
