import express from "express";
import bodyParser from "body-parser";

import { providerRouter } from "./providers/infrastructure/ProviderRouter";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use("/providers", providerRouter);

app.listen(parseInt(process.env.SERVER_PORT ?? "3000"), () => {
  console.log(`[Application] Server online in port 3000`);
});
