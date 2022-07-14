//starting point of server application
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/index.js";
import dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";

const app = express();
dotenv.config();
//to limit image size
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


app.use("/", router);

const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port:${PORT}`))
  )
  .catch((error) => console.log(error.message));

// app.use("/api/calendar", require("./routes/index"));

// mongoose.set("useFindAndModify", false); recommended by tutorial, crashed app so commented it out, just makes sure we don't get warnings in console
