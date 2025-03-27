import Image from 'next/image';
import { Body2Grey800, H5Grey800 } from '@/components/common/Typography';

interface Props {
  imgHref: string;
  firstContent: string;
  secondContent: string;
  title: string;
}

const FunctionCard = ({
  imgHref,
  firstContent,
  secondContent,
  title,
}: Props) => {
  return (
    <div className='flex w-[264px] flex-col items-center gap-8'>
      <Image
        src={imgHref}
        alt='기능 이미지'
        width={264}
        height={216}
        className='h-[216px] w-[264px]'
      />
      <div className='flex flex-col items-center gap-4'>
        <H5Grey800>{title}</H5Grey800>
        <div className='flex flex-col items-center'>
          <Body2Grey800>{firstContent}</Body2Grey800>
          <Body2Grey800>{secondContent}</Body2Grey800>
        </div>
      </div>
    </div>
  );
};

export default FunctionCard;
