import express from "express";
import bodyParser from "body-parser";
// import aws from "aws-sdk";

import { providerRouter } from "./providers/infrastructure/ProviderRouter";
import path from "path";

const app = express();

// aws.config.update({
//   accessKeyId: process.env.AccessKeyId,
//   secretAccessKey: process.env.SecretAccessKey,
// });

// const s3 = new aws.S3();

// app.get("/uploads/:filename", (req, res) => {
//   const filename = req.params.filename;

//   const params = {
//     Bucket: process.env.BUCKET_NAME!,
//     Key: filename,
//   };

//   // Obtener el objeto desde S3
//   s3.getObject(params, (err, data) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send("Error al obtener la imagen desde S3");
//     } else {
//       // Configurar los encabezados de respuesta para la imagen
//       res.setHeader("Content-Length", data.ContentLength!);
//       res.setHeader("Content-Type", data.ContentType!);
//       res.send(data.Body);
//     }
//   });
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use("/providers", providerRouter);
app.get("/images-providers/:filename", (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, "images-providers", filename);
  res.sendFile(imagePath);
});

const port = parseInt(process.env.SERVER_PORT ?? "3000");

app.listen(port, () => {
  console.log('[Application] Server online in port ' + port)
});
