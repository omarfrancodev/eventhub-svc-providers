import express from 'express';
import multer from "multer";
import {
  createProviderController,
  deleteProviderController,
  updateProviderController,
  findAllProviderController,
  findByIdProviderController,
  findByCategoryProvidersController
} from './dependencies';

export const providerRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/"); // Ruta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.originalname);
  },
});

const upload = multer({ storage });

providerRouter.post('/',upload.array("images"), createProviderController.run.bind(createProviderController));
providerRouter.delete('/:id', deleteProviderController.run.bind(deleteProviderController));
providerRouter.patch('/:id', upload.array("images"), updateProviderController.run.bind(updateProviderController));
providerRouter.get('/', findAllProviderController.run.bind(findAllProviderController));
providerRouter.get('/:id', findByIdProviderController.run.bind(findByIdProviderController));
providerRouter.get('/category/:category', findByCategoryProvidersController.run.bind(findByCategoryProvidersController));

