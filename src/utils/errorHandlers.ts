import { z } from "zod";
export class ServerActionError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: Record<string, unknown>,
    public validationErrors?: Array<{ field?: string; message: string; code?: string; }>
  ) {
    super(message);
    this.name = 'ServerActionError';
  }
}

export function handleServerActionError(error: unknown): ServerActionError {
  if (error instanceof ServerActionError) {
    return {
      name: error.name,
      message: error.message,
      code: error.code,
      details: error.details,
      validationErrors: error.validationErrors,
    };
  }

  if (error instanceof z.ZodError) {
    return {
      name: 'ServerActionError',
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
      validationErrors: error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        code: 'INVALID_FIELD'
      }))
    };
  }

  if (error instanceof Error) {
    return {
      name: 'ServerActionError',
      message: error.message,
      code: 'UNKNOWN_ERROR',
      details: { name: error.name }
    };
  }

  return {
    name: 'ServerActionError',
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
    details: { error }
  };
}
