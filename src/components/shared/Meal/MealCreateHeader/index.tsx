import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { CalendarType } from '@/type/calendar';
import { SelectedCategory } from '@/type/menuCategory/category';
import Button from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input';
import { Selectbox } from '@/components/common/Selectbox';
import { H2BlackH2 } from '@/components/common/Typography';
import { MealHeaderFormData } from '@/components/shared/Meal/MealHeader';
import { PAGE_TITLE } from '@/constants/_pageTitle';
import useNavigate from '@/hooks/useNavigate';

type MealCreateHeaderProps = {
  pageHeaderTitle: string;
  selectedCategory: SelectedCategory;
  type?: CalendarType;
  inputValue?: string;
  register?: UseFormRegister<MealHeaderFormData>;
  handleResetMenu?: () => void;
  handleEditMenu?: () => void;
  handleCreateSurvey?: () => void;
  handleSaveExcel?: () => void;
  handleDeleteMenu?: () => void;
  errors?: FieldErrors<MealHeaderFormData>;
};

const MealCreateHeader = ({
  pageHeaderTitle,
  selectedCategory,
  type,
  inputValue,
  register,
  handleResetMenu,
  handleEditMenu,
  handleCreateSurvey,
  handleSaveExcel,
  handleDeleteMenu,
  errors,
}: MealCreateHeaderProps) => {
  const { handleBack } = useNavigate();

  return (
    <div className='flex flex-col gap-6'>
      <H2BlackH2>{pageHeaderTitle}</H2BlackH2>
      <div className='flex w-fit items-center gap-4'>
        <div className='w-[194px]'>
          <Input
            size='s'
            variant='white'
            defaultValue={inputValue || ''}
            disabled={pageHeaderTitle === PAGE_TITLE.menualPlan.create}
            isError={!!errors?.monthMenuName?.message}
            autoComplete='off'
            {...(register ? register('monthMenuName') : {})}
          />
        </div>
        <div className='flex w-fit gap-4'>
          <Selectbox
            buttonSize='sm'
            selectedValue={selectedCategory.majorCategory}
            readonly={true}
          />
          <Selectbox
            buttonSize='sm'
            selectedValue={selectedCategory.minorCategory}
            readonly={true}
          />
        </div>
        {type === 'default' && (
          <Button variant='primary' size='sm' type='submit'>
            생성
          </Button>
        )}
        {type === 'create' && (
          <div className='flex w-fit items-center gap-4'>
            <Button
              variant='primary'
              size='sm'
              type='submit'
              disabled={!inputValue}
            >
              저장
            </Button>
            <Button
              variant='teritary'
              size='sm'
              type='button'
              onClick={handleEditMenu}
            >
              메뉴 수정
            </Button>
          </div>
        )}
        {type === 'edit' && (
          <div className='flex w-fit items-center gap-4'>
            <Button
              className='h-10 w-fit'
              size='basic'
              variant='outline'
              type='button'
              onClick={handleResetMenu}
            >
              메뉴 초기화
            </Button>
            <Button className='h-10 w-fit' size='basic' type='submit'>
              수정 완료
            </Button>
            <Button
              className='h-10 w-fit'
              size='basic'
              type='button'
              onClick={handleBack}
            >
              취소
            </Button>
          </div>
        )}
        {type === 'menualCreate' && (
          <div className='flex w-fit items-center gap-4'>
            <Button
              className='h-10 w-fit'
              size='basic'
              variant='outline'
              type='button'
              onClick={handleResetMenu}
            >
              메뉴 초기화
            </Button>
            <Button className='h-10 w-fit' size='basic' type='submit'>
              생성
            </Button>
          </div>
        )}
        {type === 'mealPlan' && (
          <div className='flex w-fit items-center gap-4'>
            <Button
              className='h-10 w-fit'
              size='basic'
              variant='outline'
              type='button'
              onClick={handleCreateSurvey}
            >
              설문 생성
            </Button>
            <Button
              className='h-10 w-fit'
              size='basic'
              variant='outline'
              type='button'
              onClick={handleSaveExcel}
            >
              엑셀 저장
            </Button>
            <Button
              className='h-10 w-fit'
              size='basic'
              type='button'
              onClick={handleEditMenu}
            >
              수정
            </Button>
            <Button
              className='h-10 w-fit'
              size='basic'
              type='button'
              onClick={handleDeleteMenu}
            >
              삭제
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealCreateHeader;
