import { Question } from '@/type/survey/surveyResponse';

export const getTextResponsesByQuestionText = (
  satisfactionDistributions: Question[],
  questionText: string,
): string[] | null => {
  const foundItem = satisfactionDistributions.find(
    (item) => item.questionText === questionText,
  );

  if (!foundItem || foundItem.answerType !== 'text') {
    return null;
  }

  return foundItem.textResponses;
};
