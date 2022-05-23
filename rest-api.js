import { app } from "./app.js";
import * as db from "./functions.js";

import jwt from "jsonwebtoken";

/********************************
 *
 * REST API Routes
 *
 *******************************/

// CREATE a user with request body data
app.post("/user", function (req, res) {
  let user = db.createUser(req.body);
  if (user) {
    res.sendStatus(201);
  } else {
    res.sendStatus(409);
  }
});

// READ user info by id
app.get("/user/:id", function (req, res) {
  let user = db.getUser(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

// UPDATE user with request body dada
app.put("/user/:id", function (req, res) {
  let user = db.getUser(req.params.id);
  if (user) {
    db.updateUser(user.id, req.body);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// DELETE user by id
app.delete("/user/:id", function (req, res) {
  let user = db.getUser(req.params.id);
  if (user) {
    db.deleteUser(user.id, req.body);
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

const API_KEY = "5599299BD5284E2BB7F3B69CD568F"; // 256-bit WEP Key

// READ user info by id
app.get("/jwt/user/:id", validateToken, function (req, res) {
  if (req.data.user.id == req.params.id) {
    res.json(req.data);
  } else {
    res.sendStatus(403);
  }
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
function validateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (typeof authHeader !== "undefined") {
    req.token = authHeader.split(" ")[1]; // Bearer <token>
    jwt.verify(req.token, API_KEY, function (err, data) {
      if (err) {
        res.sendStatus(403);
      } else {
        req.data = data;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
}
