//starting point of server application
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/index.js";

//imports are same as const express=require("express"), added   "type": "module", on line 6 of package.json to use this verbiage

const app = express();
//to limit image size
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/", router);
// https://www.mongodb.com/cloud/atlas

const CONNECTION_URL =
  "mongodb://emilychase:emilychase123@cluster0-shard-00-00.3rwhr.mongodb.net:27017,cluster0-shard-00-01.3rwhr.mongodb.net:27017,cluster0-shard-00-02.3rwhr.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-h1vcrf-shard-0&authSource=admin&retryWrites=true&w=majority";
// mongodb+srv://emilychase:<password>@cluster0.3rwhr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
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
