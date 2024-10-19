const Item = ({ menu }: { menu: string }) => {
  return (
    <div className='max-w-24'>
      <span className='block overflow-hidden text-ellipsis whitespace-nowrap text-center'>
        {menu}
      </span>
    </div>
  );
};

export default Item;
