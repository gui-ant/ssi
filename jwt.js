import { app } from "./app.js";
import * as db from "./functions.js";

import jwt from "jsonwebtoken";

const MY_SECRET_KEY = "5599299BD5284E2BB7F3B69CD568F"; // 256-bit WEP Key

// POST /login
app.post("/login", function (req, res) {
  const user = db.getUser(req.body.id);
  if (user) {
    const token = jwt.sign({ user }, MY_SECRET_KEY);
    res.json({ token: token });
  } else {
    res.sendStatus(404);
  }
});

// GET /user
app.get("/user", ensureToken, function (req, res) {
  jwt.verify(req.token, MY_SECRET_KEY, function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        _comment: "Uff! It worked!",
        users: db.getAllUsers(),
      });
    }
  });
});

function ensureToken(req, res, next) {
  const authHeader = req.headers["authorization"]; // Bearer <key>
  if (typeof authHeader !== "undefined") {
    req.token = authHeader.split(" ")[1];
    next();
  } else {
    res.sendStatus(403);
  }
}
