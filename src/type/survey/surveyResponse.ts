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

export interface SurveyDetailResponse {
  surveyName: string;
  deadline: Date | null;
  mandatoryQuestions: Question[];
  additionalQuestions: Question[];
  averageScores: AverageScores;
  mmId: string;
}

export interface Question {
  questionId: number;
  questionText: string;
  radioResponses: Record<string, number>;
  textResponses: string[];
  answerType: 'radio' | 'text';
}

export interface AverageScores {
  totalSatisfaction: number;
  portionSatisfaction: number;
  hygieneSatisfaction: number;
  tasteSatisfaction: number;
}

export interface PutSurveyResponse {
  surveyId: number;
  surveyName: string;
  deadlineAt: Date | null;
  state: string;
  updatedQuestions: {
    questionId: number;
    updatedAt: Date | null;
  }[];
}

export interface PostSurveyResponsesResponse {
  responseId: number;
  surveyId: number;
}

export interface PostSurveyQrCodeResponse {
  header: {
    resultCode: number;
    resultMessage: string;
    isSuccessful: boolean;
  };
  body: {
    shortUrl: string;
    originUrl: string;
    status: string;
    backHalfType: string;
    description: null;
    startDateTime: Date;
    endDateTime: Date;
  };
}

export interface GetSurveyQrCodeResponse {
  header: {
    resultCode: number;
    resultMessage: string;
    isSuccessful: boolean;
  };
  body: string;
}
