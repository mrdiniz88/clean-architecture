export type NotificationErrorProps = {
  message: string;
  context: string;
}

export class Notification {
  private errors: NotificationErrorProps[] = [];

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  getErrors(): NotificationErrorProps[] {
    return this.errors;
  }

  addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  messages(context?: string): string {
    let message = "";

    this.errors.forEach((error) => {
      if(!context || error.context === context) {
        message += `${error.context}: ${error.message},`
      }
    }) 

    return message;
  }
}
