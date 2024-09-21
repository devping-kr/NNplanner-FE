import { CardTitle } from '@/components/common/Typography';

interface Props {
  title: string;
  top3Data: { date: string; menu: string[] }[];
}

const TopCard = ({ top3Data, title }: Props) => {
  return (
    <div className='flex h-full flex-col gap-3'>
      <CardTitle>{title}</CardTitle>
      <div className='flex h-full w-full flex-col gap-3'>
        <div className='flex h-full gap-5'>
          {top3Data.map((menus) => (
            <div
              key={menus.date}
              className='flex w-full flex-col items-center gap-4 rounded border border-gray-300 p-3 hover:border-green-500 active:border-green-600'
            >
              <span>{menus.date}</span>
              <ul className='flex flex-col gap-1'>
                {menus.menu.map((menu, idx) => (
                  <li key={idx} className='text-center'>
                    {menu}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCard;
