import express from 'express';
import multer from 'multer';
// import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
// import multerS3 from 'multer-s3';

dotenv.config(); // Cargar variables de entorno desde el archivo .env

import {
  createProviderController,
  deleteProviderController,
  updateProviderController,
  findAllProviderController,
  findByIdProviderController,
  findByCategoryProvidersController
} from './dependencies';

export const providerRouter = express.Router();

// const s3Client  = new S3Client({
//   region: process.env.REGION_S3, // Ejemplo: "us-east-1"
//   credentials:{
//     accessKeyId: process.env.AccessKeyId!,
//     secretAccessKey: process.env.SecretAccessKey!,
//   },
// });
// export const uploadS3 = multer({
//   storage: multerS3({
//     s3: s3Client,
//     bucket: process.env.BUCKET_NAME!,
//     key: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//       cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split(".").pop());
//     },
//   }),
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.originalname);
  },
});

const upload = multer({ storage });

providerRouter.post('/',upload.array("images"), createProviderController.run.bind(createProviderController));
// providerRouter.post('/',uploadS3.array("images"), createProviderController.run.bind(createProviderController));
providerRouter.delete('/:id', deleteProviderController.run.bind(deleteProviderController));
providerRouter.patch('/:id', upload.array("images"), updateProviderController.run.bind(updateProviderController));
// providerRouter.patch('/:id', uploadS3.array("images"), updateProviderController.run.bind(updateProviderController));
providerRouter.get('/', findAllProviderController.run.bind(findAllProviderController));
providerRouter.get('/:categories', findByCategoryProvidersController.run.bind(findByCategoryProvidersController));
providerRouter.get('/:id', findByIdProviderController.run.bind(findByIdProviderController));

