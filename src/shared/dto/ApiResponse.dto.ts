export class ApiResponse {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
    public readonly content?: any,
  ) {}
}
