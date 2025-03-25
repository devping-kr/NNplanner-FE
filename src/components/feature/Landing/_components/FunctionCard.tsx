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
      <div className='flex items-center justify-center rounded-2xl bg-white-100 px-[85px] py-14'>
        <Image
          src={imgHref}
          alt='기능 이미지'
          width={94}
          height={104}
          style={{ width: 94, height: 104 }}
          className='h-[104px] w-[94px]'
        />
      </div>
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
