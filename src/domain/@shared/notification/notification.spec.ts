import { Notification } from "./notification";

describe("Unit test for notifications", () => {

  it("should create errors", () => {
    const notification = new Notification();

    const error = {
      message: "error message",
      context: "customer",
    }

    notification.addError(error);

    expect(notification.messages("customer")).toBe("customer: error message,");

    const error2 = {
      message: "error message2",
      context: "customer",
    }

    notification.addError(error2);

    const error3 = {
      message: "error message",
      context: "order",
    }

    notification.addError(error3);

    expect(notification.messages("customer")).toBe("customer: error message,customer: error message2,");   
    
    expect(notification.messages()).toBe("customer: error message,customer: error message2,order: error message,");
  })

})
