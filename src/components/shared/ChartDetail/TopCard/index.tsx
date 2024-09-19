import { CardTitle } from '@/components/common/Typography';

interface Props {
  title: string;
  top3Data: { date: string; menu: string[] }[];
}

const TopCard = ({ top3Data, title }: Props) => {
  return (
    <>
      <CardTitle>{title}</CardTitle>
      <div className='flex w-full flex-col gap-3'>
        <div className='flex gap-5'>
          {top3Data.map((menus) => (
            <div
              key={menus.date}
              className='flex w-full flex-col items-center gap-3 rounded border border-gray-300 p-3 hover:border-green-500 active:border-green-600'
            >
              <span>{menus.date}</span>
              <ul className='flex flex-col'>
                {menus.menu.map((menu) => (
                  <li key={menu} className='text-center'>
                    {menu}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TopCard;
