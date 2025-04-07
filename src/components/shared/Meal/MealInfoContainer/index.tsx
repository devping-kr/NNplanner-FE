type MealInfoContainerProps = {
  children: React.ReactNode;
};

const MealInfoContainer = ({ children }: MealInfoContainerProps) => {
  return (
    <div className='top-[246px] flex h-fit w-80 flex-col gap-6 rounded-2xl bg-white-100 p-4'>
      {children}
    </div>
  );
};

export default MealInfoContainer;
