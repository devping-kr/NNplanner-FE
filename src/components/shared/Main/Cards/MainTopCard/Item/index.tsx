import { Body2Black } from '@/components/common/Typography';

const Item = ({ menu }: { menu: string }) => {
  return (
    <div className='w-full text-center'>
      <Body2Black>{menu}</Body2Black>
    </div>
  );
};

export default Item;
