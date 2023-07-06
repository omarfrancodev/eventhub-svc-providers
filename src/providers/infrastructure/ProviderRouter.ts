import express from 'express';
import multer from 'multer';

import {
  createProviderController,
  deleteProviderController,
  updateProviderController,
  findAllProviderController,
  findByIdProviderController,
  findByCategoryProvidersController,
  findByUserIdController
} from './dependencies';
import path from 'path';

export const providerRouter = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/images-providers/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage });

providerRouter.post('/',upload.array("images"), createProviderController.run.bind(createProviderController));
providerRouter.delete('/:id', deleteProviderController.run.bind(deleteProviderController));
providerRouter.patch('/:id', upload.array("images"), updateProviderController.run.bind(updateProviderController));
providerRouter.get('/', findAllProviderController.run.bind(findAllProviderController));
providerRouter.get('/:id', findByIdProviderController.run.bind(findByIdProviderController));
providerRouter.get('/categories/:categories', findByCategoryProvidersController.run.bind(findByCategoryProvidersController));
providerRouter.get('/user/:id', findByUserIdController.run.bind(findByUserIdController));

