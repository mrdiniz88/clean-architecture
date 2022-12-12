import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          street: "Street",
          city: "City",
          number: 123,
          zip: "Zip",
        },
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("John");
    expect(response.body.address.street).toBe("Street");
    expect(response.body.address.city).toBe("City");
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.zip).toBe("Zip");
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/customer").send({
      name: "John",
    });

    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
    await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          street: "Street",
          city: "City",
          number: 123,
          zip: "Zip",
        },
      });

    await request(app)
      .post("/customer")
      .send({
        name: "Jame",
        address: {
          street: "Street 2",
          city: "City 2",
          number: 1234,
          zip: "Zip 2",
        },
      });

    const listResponse = await request(app).get("/customer");

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers).toHaveLength(2);
    expect(listResponse.body.customers[0].name).toBe("John");
    expect(listResponse.body.customers[1].name).toBe("Jame");
  });
});
