import Image from 'next/image';
import { H5Grey800 } from '@/components/common/Typography';

interface Props {
  imgHref: string;
  firstContent: string;
  secondContent: string;
}

const ServiceCard = ({ imgHref, firstContent, secondContent }: Props) => {
  return (
    <div className='flex w-full flex-col items-center gap-4 rounded-2xl bg-grey-50 p-8 pb-12'>
      <Image
        src={imgHref}
        alt='서비스카드 이미지'
        width={280}
        height={280}
        className='h-[280px] w-[280px]'
      />
      <div className='flex flex-col items-center'>
        <H5Grey800>{firstContent}</H5Grey800>
        <H5Grey800>{secondContent}</H5Grey800>
      </div>
    </div>
  );
};

export default ServiceCard;
