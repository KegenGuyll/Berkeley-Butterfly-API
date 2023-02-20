/* eslint-disable class-methods-use-this */
import { Response } from "express";
import { AppError, HttpCode } from "./AppError";

class ErrorHandler {
  public handleError(error: Error | AppError, response?: Response): void {
    if (this.isTrustedError(error) && response) {
      this.handleTrustedError(error as AppError, response);
    } else {
      this.handleUntrustedError(error, response);
    }
  }

  public isTrustedError(error: Error): boolean {
    if (error instanceof AppError) {
      return error.isOperational;
    }

    return false;
  }

  private handleTrustedError(error: AppError, response: Response): void {
    response
      .status(error.httpCode)
      .json({ success: false, error: error.message });
  }

  private handleUntrustedError(
    error: Error | AppError,
    response?: Response
  ): void {
    if (response) {
      response
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: "Internal server error" });
    }

    console.log("Application encountered an untrusted error.");
    console.log(error);
  }
}

const errorHandler = new ErrorHandler();

export default errorHandler;
