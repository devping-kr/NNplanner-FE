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
