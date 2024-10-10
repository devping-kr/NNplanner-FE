export interface SurveyListResponse {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  surveys: {
    surveyId?: string;
    surveyName?: string;
    createdAt?: string;
    deadlineAt?: string;
    state?: string;
  }[];
}
