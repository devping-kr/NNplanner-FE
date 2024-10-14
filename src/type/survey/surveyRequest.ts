import { inputsType } from '@/components/feature/Survey/Create';

export interface PostSurveyRequest {
  mmId: string;
  surveyName: string;
  deadlineAt: Date | null;
  additionalQuestions: inputsType[];
}
