import express from "express";
import bodyParser from "body-parser";

import { providerRouter } from "./providers/infrastructure/ProviderRouter";
import path from "path";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
