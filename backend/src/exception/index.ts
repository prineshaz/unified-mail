export class BaseError extends Error {
  status: number;
  info: Record<string, any>;
  constructor(message: string, info: Record<string, any> = {}) {
    super(message);
    this.name = this.constructor.name;
    this.status = 500;
    this.info = info;
  }
}

export class DbError extends BaseError {
  constructor(message: string, info: Record<string, any>) {
    super(message, info);
    this.status = 500;
  }
}

export class ServerError extends BaseError {
  constructor(message: string, info: Record<string, any>) {
    super(message, info);
    this.status = 500;
  }
}

export class ValidationError extends BaseError {
  constructor(message: string, info: Record<string, any>) {
    super(message, info);
    this.status = 400;
  }
}

export class ForbiddenError extends BaseError {
    constructor(message: string, info: Record<string, any>) {
      super(message, info);
      this.status = 403;
    }
  }

export class NotFoundError extends BaseError {
  constructor(message: string, info: Record<string, any>) {
    super(message, info);
    this.status = 404;
  }
}

export class ConflictError extends BaseError {
    constructor(message: string, info: Record<string, any>) {
      super(message, info);
      this.status = 409;
    }
  }

export class UnauthorizedError extends BaseError {
  constructor(message: string, info: Record<string, any>) {
    super(message, info);
    this.status = 401;
  }
}
