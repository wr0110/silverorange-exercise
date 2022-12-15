export class AppError extends Error {
  public status: number;

  constructor(message: string, status: number = 500) {
    super(message);

    Object.setPrototypeOf(this, AppError.prototype);

    this.name = 'AppError';
    this.status = status;
  }
}
