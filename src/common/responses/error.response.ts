export function errorResponse(message: string, statusCode = 500) {
  return {
    status: 'error',
    message,
    statusCode,
  };
}
