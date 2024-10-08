export const AUTH_ERROR = {
  base: {
    email: '이메일을 다시 확인해주세요',
    password: '8~16자의 영문, 숫자를 포함한 비밀번호를 입력해주세요',
  },
  signup: {
    username: '2~5자의 한글/영문만 사용 가능합니다',
    passwordConfirm: '비밀번호가 일치하지 않습니다.',
  },
};

export const MEAL_HEADER_ERROR = {
  name: {
    min: '식단 이름은 최소 2자 이상 입력해주세요',
    max: '식단 이름은 최대 20자까지 입력 가능합니다',
  },
  category: {
    min: '식단의 카테고리를 선택해주세요.',
  },
};
