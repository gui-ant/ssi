import express from "express";

import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig.js";

const app = express();

app.listen(3000, function () {
  console.log("Server listening (http://localhost:3000)");
});

// Default route
app.get("/", function (req, res) {
  res.json("So, let's try to get some REST (securely)!");
});

app.use(express.json());

// Database initialization
const db = new JsonDB(new Config("database.json", true, true)); // Config params: <filename>, <saveOnPush>, <humanReadable>

export { app, db };
