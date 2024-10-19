import Image from 'next/image';

interface Props {
  data: {
    name: string;
    id: number;
    img: string;
  }[];
}

const SeasonCard = ({ data }: Props) => {
  return (
    <div className='flex w-full gap-2'>
      {data.map((season) => (
        <div
          className='flex w-full flex-col items-center gap-3'
          key={season.id}
        >
          <Image
            src={season.img}
            alt={season.name}
            width={180}
            height={180}
            className='rounded'
          />
          <span className='font-semibold'>{season.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SeasonCard;
