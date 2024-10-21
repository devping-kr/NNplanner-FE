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
  [key: string]: number;
}

export interface SatisfactionDistributionItem {
  questionId: number;
  questionText: string;
  satisfactionDistribution: SatisfactionDistribution;
  textResponses: string[];
  answerType: 'radio' | 'text';
}

export interface AverageScores {
  totalSatisfaction: number;
  portionSatisfaction: number;
  hygieneSatisfaction: number;
  tasteSatisfaction: number;
}

export interface SurveyDetailResponse {
  surveyName: string;
  satisfactionDistributions: SatisfactionDistributionItem[];
  averageScores: AverageScores;
}
