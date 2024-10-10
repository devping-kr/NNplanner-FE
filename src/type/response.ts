type Response = {
  message: string;
};

export type Result<TData> = Response & {
  data: TData;
};

export type FailResponse = Response;
