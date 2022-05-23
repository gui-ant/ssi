import { app } from "./app.js";
import * as db from "./functions.js";

import jwt from "jsonwebtoken";

/********************************
 *
 * REST API Routes
 *
 *******************************/

const API_KEY = "5599299BD5284E2BB7F3B69CD568F"; // 256-bit WEP Key

// CREATE a user with request body data
app.post("/user", function (req, res) {
  let u = db.createUser(req.body);
  if (u) {
    res.sendStatus(201);
  } else {
    res.sendStatus(409);
  }
});

// READ user info by id
app.get("/user/:id", function (req, res) {
  let u = db.getUser(req.params.id);
  if (u) {
    res.json(u);
  } else {
    res.sendStatus(404);
  }
});

// UPDATE user with request body dada
app.put("/user/:id", function (req, res) {
  let u = db.getUser(req.params.id);
  if (u) {
    db.updateUser(u.id, req.body);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// DELETE user by id
app.delete("/user/:id", function (req, res) {
  let u = db.getUser(req.params.id);
  if (u) {
    db.deleteUser(u.id, req.body);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

/****************************
 *
 * JWT Protected route
 *
 ****************************/

// READ user info by id
app.get("/jwt/user/:id", ensureToken, function (req, res) {
  jwt.verify(req.token, API_KEY, function (err, data) {
    if (err || data.user.id !== req.params.id) {
      res.sendStatus(403);
    } else {
      res.json(data);
    }
  });
});

// Login / Token generate
app.post("/login", function (req, res) {
  const user = db.getUser(req.body.id);
  if (user) {
    const token = jwt.sign({ user }, API_KEY);
    res.json({ token: token });
  } else {
    res.sendStatus(404);
  }
});

// Middleware
function ensureToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (typeof authHeader !== "undefined") {
    req.token = authHeader.split(" ")[1];
    next();
  } else {
    res.sendStatus(403);
  }
}
