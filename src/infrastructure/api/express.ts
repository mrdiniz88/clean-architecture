import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/repository/sequelize/customer.model";
import ProductModel from "../product/repository/sequelize/product.model";
import { customerRoute } from "./routes/customer";
import { productRoute } from "./routes/product";

export const app: Express = express();

app.use(express.json());
app.use("/customer", customerRoute);
app.use("/product", productRoute);

export let sequelize: Sequelize;

(async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "dev.db",
    logging: false,
  });

  sequelize.addModels([CustomerModel, ProductModel]);

  await sequelize.sync();
})();
