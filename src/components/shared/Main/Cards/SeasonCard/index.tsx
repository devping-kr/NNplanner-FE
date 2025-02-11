import Image from 'next/image';
import { MenuRecipeListResponse } from '@/type/openAPI/recipeResponse';
import { Label1Black } from '@/components/common/Typography';

type SeasonCardProps = {
  data: MenuRecipeListResponse[];
};

const SeasonCard = ({ data }: SeasonCardProps) => {
  return (
    <div className='flex w-full gap-6'>
      {data?.map((recipe) => (
        <div
          className='flex w-full flex-col items-center gap-4'
          key={recipe.recipeId}
        >
          <Image
            src={recipe.imageUrl}
            alt={recipe.recipeName}
            width={200}
            height={120}
            style={{ height: '120px' }}
            className='rounded-lg object-fill'
          />
          <Label1Black>{recipe.recipeName}</Label1Black>
        </div>
      ))}
    </div>
  );
};

export default SeasonCard;
