export type SuccessResponse<TData> = Response & {
  data: TData;
};
