export interface BaseResponse<T> {
  message: string;
  result: T;
  statusCode: number;
}

/**
 * Hàm format response chung cho mọi API
 * - Dùng cho Create, Update, Delete, GetOne, GetList
 */
export function formatResponse<T>(
  result: T,
  message: string,
  statusCode: number = 200, // Mặc định là 200, có thể thay đổi (201, 204,...)
): BaseResponse<T> {
  return { message, result, statusCode };
}
