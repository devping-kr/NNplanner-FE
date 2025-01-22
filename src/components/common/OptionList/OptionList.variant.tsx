import { cva } from 'class-variance-authority';

// 추후 variants 비롯 파일 전체 삭제
export const optionListUlVariants = cva('flex h-full w-full flex-col', {
  variants: {
    // 추후 삭제
    size: {
      small: '',
      basic: '',
      large: '',
    },
  },
});

// 추후 variants 비롯 파일 전체 삭제
export const optionListLiVariants = cva('', {
  variants: {
    // 추후 삭제
    size: {
      small: '',
      basic: '',
      large: '',
    },
  },
});
