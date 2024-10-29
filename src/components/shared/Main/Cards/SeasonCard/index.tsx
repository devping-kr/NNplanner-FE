import Image from 'next/image';
import { MenuRecipeListResponse } from '@/type/openAPI/recipeResponse';

type SeasonCardProps = {
  data: MenuRecipeListResponse[];
};

const SeasonCard = ({ data }: SeasonCardProps) => {
  return (
    <div className='flex w-full gap-2'>
      {data?.map((recipe) => (
        <div
          className='flex w-full flex-col items-center gap-3'
          key={recipe.recipeId}
        >
          <Image
            src={recipe.imageUrl}
            alt={recipe.recipeName}
            width={180}
            height={180}
            className='rounded'
          />
          <span className='font-semibold'>{recipe.recipeName}</span>
        </div>
      ))}
    </div>
  );
};

export default SeasonCard;
