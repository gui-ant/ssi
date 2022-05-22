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

//  Default database content
db.push(
  "/users",
  [
    {
      id: "25970",
      name: "David Gaspar",
      pass: "$2a$12$ntd5XKIheZBZJXSCCLpdj.5Of9DpdyfOd.knk75JCdCfBEtppG87u",
    },
    {
      id: "82911",
      name: "Jorge Amorim",
      pass: "$2a$12$ntd5XKIheZBZJXSCCLpdj.5Of9DpdyfOd.knk75JCdCfBEtppG87u",
    },
    {
      id: "87361",
      name: "Guilherme Antunes",
      pass: "$2a$12$ntd5XKIheZBZJXSCCLpdj.5Of9DpdyfOd.knk75JCdCfBEtppG87u",
    },
  ],
  true
);

export { app, db };
