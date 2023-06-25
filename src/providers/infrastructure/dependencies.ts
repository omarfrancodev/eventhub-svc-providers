import { CreateProviderUseCase } from "../application/CreateProviderUseCase";
import { DeleteProviderUseCase } from "../application/DeleteProviderUseCase";
import { FindAllProvidersUseCase } from "../application/FindAllProviderUseCase";
import { FindByCategoryProvidersUseCase } from "../application/FindByCategoryProvidersUseCase";
import { FindByIdProviderUseCase } from "../application/FindByIdProviderUseCase";
import { UpdateProviderUseCase } from "../application/UpdateProviderUseCase";

import { CreateProviderController } from "./controllers/CreateProviderController";
import { DeleteProviderController } from "./controllers/DeleteProviderController";
import { FindAllProviderController } from "./controllers/FindAllProviderController";
import { FindByCategoryProviderController } from "./controllers/FindByCategoryProvidersController";
import { FindByIdProviderController } from "./controllers/FindByIdProviderController";
import { UpdateProviderController } from "./controllers/UpdateProviderController";

import { PostgreProviderRepository } from "./implementation/PostgreProviderRepository";

const postgreProviderRepository = new PostgreProviderRepository();

const createProviderUseCase = new CreateProviderUseCase(postgreProviderRepository);
export const createProviderController = new CreateProviderController(createProviderUseCase);

const deleteProviderUseCase = new DeleteProviderUseCase(postgreProviderRepository);
export const deleteProviderController = new DeleteProviderController(deleteProviderUseCase);

const updateProviderUseCase = new UpdateProviderUseCase(postgreProviderRepository);
export const updateProviderController = new UpdateProviderController(updateProviderUseCase);

const findAllProviderUseCase = new FindAllProvidersUseCase(postgreProviderRepository);
export const findAllProviderController = new FindAllProviderController(findAllProviderUseCase);

const findByIdProviderUseCase = new FindByIdProviderUseCase(postgreProviderRepository);
export const findByIdProviderController = new FindByIdProviderController(findByIdProviderUseCase);

const findByCategoryProvidersUseCase = new FindByCategoryProvidersUseCase(postgreProviderRepository);
export const findByCategoryProvidersController = new FindByCategoryProviderController(findByCategoryProvidersUseCase);