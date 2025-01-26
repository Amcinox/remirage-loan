export type ServerError = {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
  validationErrors?: Array<{
    field?: string;
    message: string;
    code?: string;
  }>;
};

export type ServerActionResult<TData> =
  | { data: TData; error?: never; }
  | { data?: never; error: ServerError; };


