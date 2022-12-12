import { Request, Response, Router } from "express";
import { InputCreateCustomerDTO } from "../../../usecase/customer/create/create-customer.dto";
import CreateCustomerUseCase from "../../../usecase/customer/create/create-customer.usecase";
import ListCustomerUseCase from "../../../usecase/customer/list/list-customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";

export const customerRoute = Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());

  const { name, address } = req.body;

  try {
    const customerDTO: InputCreateCustomerDTO = {
      name,
      address,
    };

    const output = await usecase.execute(customerDTO);

    res.status(201).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

customerRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());

  try {
    const output = await usecase.execute({});

    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
