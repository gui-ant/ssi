import { app } from "./app.js";
import * as db from "./functions.js";

import jwt from "jsonwebtoken";
const API_KEY = "5599299BD5284E2BB7F3B69CD568F"; // 256-bit WEP Key

/**
 * REST API Routes
 */

// GET /user
app.get("/user", function (req, res) {
  res.json(db.getAllUsers());
});

// GET /user/:id
app.get("/user/:id", function (req, res) {
  let u = db.getUser(req.params.id);
  if (u) {
    res.json(u);
  } else {
    res.sendStatus(404);
  }
});

// POST /user
app.post("/user", function (req, res) {
  let u = db.createUser(req.body);
  if (u) {
    res.sendStatus(201);
  } else {
    res.sendStatus(409);
  }
});

// PUT /user/:id
app.put("/user/:id", function (req, res) {
  let u = db.getUser(req.params.id);
  if (u) {
    db.updateUser(u.id, req.body);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// DELETE /user/:id
app.delete("/user/:id", function (req, res) {
  let u = db.getUser(req.params.id);
  if (u) {
    db.deleteUser(u.id, req.body);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

/**
 * JWT Protected Routes
 */

// POST /login
app.post("/login", function (req, res) {
  const user = db.getUser(req.body.id);
  if (user) {
    const token = jwt.sign({ user }, API_KEY);
    res.json({ token: token });
  } else {
    res.sendStatus(404);
  }
});

// GET /user/:id
app.get("/jwt/user/:id", ensureToken, function (req, res) {
  jwt.verify(req.token, API_KEY, function (err, data) {
    if (err || data.user.id !== req.params.id) {
      res.sendStatus(403);
    } else {
      res.json(data);
    }
  });
});

function ensureToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (typeof authHeader !== "undefined") {
    req.token = authHeader.split(" ")[1];
    next();
  } else {
    res.sendStatus(403);
  }
}
