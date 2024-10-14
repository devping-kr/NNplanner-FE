import { inputsType } from '@/components/feature/Survey/Create';

export interface PostSurveyRequest {
  mmId: string;
  surveyName: string;
  deadlineAt: Date | null;
  additionalQuestions: inputsType[];
}

export interface GetSearchSurveyRequest {
  search?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
  startDate?: string;
  endDate?: string;
  state?: string;
}
