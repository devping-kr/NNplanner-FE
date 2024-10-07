interface Props {
  title: string;
  top3Data: {
    date: string;
    menu: string[];
  }[];
}
const MainTopCard = ({ title, top3Data }: Props) => {
  // TODO: 해당 카드 레이아웃 다시 잡아야함
  console.log(title, top3Data);
  return (
    <div className='w-full rounded-md border border-gray-300 bg-white-100'>
      가장 최근 설문 좋아요 Top3 메뉴
    </div>
  );
};

export default MainTopCard;
