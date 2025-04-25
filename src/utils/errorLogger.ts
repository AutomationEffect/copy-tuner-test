interface ErrorLog {
  message: string;
  stack?: string;
  context?: Record<string, any>;
  timestamp: string;
}

class ErrorLogger {
  private static logs: ErrorLog[] = [];
  private static MAX_LOGS = 100;

  static log(error: Error, context?: Record<string, any>) {
    const errorLog: ErrorLog = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
    };

    console.error('[ErrorLogger]', errorLog);
    this.logs.unshift(errorLog);
    
    // Keep only the last MAX_LOGS entries
    if (this.logs.length > this.MAX_LOGS) {
      this.logs = this.logs.slice(0, this.MAX_LOGS);
    }
  }

  static getLogs() {
    return this.logs;
  }

  static clear() {
    this.logs = [];
  }
}

export default ErrorLogger;
