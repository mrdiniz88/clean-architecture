import Product from "./product";

describe("Product unit tests", () => {

  it("should throw error when name is empty", () => {
    expect(() => {
      new Product("", 100);
    }).toThrowError("product: Name is required");
  });

  it("should throw error when price is less then zero", () => {
    expect(() => {
      new Product("name", -1);
    }).toThrowError("product: Price must be greater then zero");
  });

  it("should throw error when name and id is empty e price is less then zero", () => {
    expect(() => {
      new Product("", 0, "")
    }).toThrowError("product: Id is required,product: Name is required,product: Price must be greater then zero")
  })

  it("should change name", () => {
    const product = new Product("Product 1", 100);

    product.changeName("Product 2");

    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("Product 1", 100);

    product.changePrice(200);

    expect(product.price).toBe(200);
  });
});
