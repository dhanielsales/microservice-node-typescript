export default class AppError {
  public readonly message: string;
  public readonly details: any;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400, details?: any) {
    this.message = message;
    this.details = details;
    this.statusCode = statusCode;
  }
}
