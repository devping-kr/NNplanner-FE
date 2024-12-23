# NN Planner

**🍚 건강과 영양을 지키기 위한 맞춤형 식단 추천 서비스**

'NN Planner'는 학교와 병원 등에서 필요한 맞춤형 식단을 자동으로 추천해주는 혁신적인 서비스입니다. 건강과 영양의 균형을 고려하여 최적화된 식단을 제안하며, 공공 데이터 OpenAPI를 활용해 검증된 데이터를 기반으로 사용자의 필요에 맞춘 맞춤형 식단을 제공합니다.
</br>

### [NN Planner 바로가기](https://www.nnplanner.com/)

</br>
데이터 기반의 맞춤형 서비스
기존에 사용된 식단을 공공 데이터(OpenAPI)로부터 받아 데이터베이스에 저장하고, 이를 필터링하여 영양소 균형을 고려한 맞춤형 식단을 생성합니다.

</br>

## ✨ 주요 기능

#### 자동 식단 작성

사용자의 정보를 바탕으로 영양 균형이 잡힌 식단을 자동으로 추천합니다.

#### 수동 식단 작성

사용자가 원하는 대로 영양소를 조정하여 맞춤형 식단을 직접 작성할 수 있습니다.

#### 설문 조사

식단에 대한 피드백을 받고, 이를 분석하여 더욱 개선된 추천 서비스를 제공합니다.

#### 회원 관리

개인 맞춤형 식단 서비스 제공을 위해 회원별 데이터를 관리하고, 저장된 데이터를 기반으로 맞춤형 식단을 추천합니다.

</br>

</br>

## 📚 기술 스택

- Nextjs
- Tailwindcss
- Tanstack/react-query
- Axios
- React-hook-form
- Zustand
- Zod
- Husky

</br>

</br>

## 📂 폴더 트리

```
📦public
 ┣ 📂fonts
 ┗ 📂imgs
📦src
 ┣ 📂api
 ┣ 📂app
 ┃ ┣ (auth)
 ┃ ┣ (root)
 ┃ ┃ ┣ autoPlan
 ┃ ┃ ┣ main
 ┃ ┃ ┣ menualPlan
 ┃ ┃ ┣ myPage
 ┃ ┃ ┣ survey
 ┃ ┃ ┣ viewChart
 ┃ ┃ ┣ viewPlan
 ┣ 📂components
 ┃ ┣ common
 ┃ ┣ feature
 ┃ ┗ shared
 ┣ 📂constants
 ┣ 📂contexts
 ┣ 📂hooks
 ┃ ┣ auth
 ┃ ┣ meal
 ┃ ┣ menu
 ┃ ┣ menuCategory
 ┃ ┣ openAPI
 ┃ ┣ survey
 ┃ ┣ user
 ┣ 📂lib
 ┣ 📂schema
 ┣ 📂stores
 ┣ 📂styles
 ┣ 📂type
 ┗ 📂utils
```

</br>

</br>

## 🏁 로컬 구동 방법

```
# repository clone
git clone https://github.com/devping-kr/NNplanner-FE.git

# npm 설치
npm install

# dev server
npm run dev

# build
npm run build
```
