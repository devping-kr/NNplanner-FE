import { inputsType } from '@/components/feature/Survey/Create';

export interface surveyType {
  surveyId: string;
  surveyName: string;
  createdAt: string;
  deadlineAt: string;
  state: string;
}
export interface SurveyListResponse {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  surveys: surveyType[];
}

export interface SurveyPostResponse {
  surveyId: number;
  mmId: string;
  createdAt: Date | null;
  deadlineAt: Date | null;
  questions: inputsType[];
}

export interface SatisfactionDistribution {
  question: string;
  distribution: {
    [key: string]: number;
  };
}

export interface AverageScores {
  totalSatisfaction: number;
  portionSatisfaction: number;
  hygieneSatisfaction: number;
  tasteSatisfaction: number;
}

export interface MenuResponse {
  responseDate: string;
  menu: string;
}

export interface SurveyDetailResponse {
  surveyName: string;
  likedMenusTop3: MenuResponse[];
  dislikedMenusTop3: MenuResponse[];
  desiredMenus: string[];
  messagesToDietitian: string[];
  satisfactionDistributions: SatisfactionDistribution[];
  averageScores: AverageScores;
  originalSurveyUrl: string | null;
}
