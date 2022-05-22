import { app } from "./app.js";
import * as db from "./functions.js";

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
  }
  res.sendStatus(404);
});

// POST /user
app.post("/user", function (req, res) {
  let u = db.createUser(req.body);
  if (u) {
    res.json(db.getUser(u.id));
  }
  res.sendStatus(409);
});

// PUT /user/:id
app.put("/user/:id", function (req, res) {
  let u = db.getUser(req.params.id);
  if (u) {
    db.updateUser(u.id, req.body);
    res.json(db.getUser(u.id));
  }
  res.sendStatus(404);
});

// DELETE /user/:id
app.delete("/user/:id", function (req, res) {
  let u = db.getUser(req.params.id);
  if (u) {
    db.deleteUser(u.id, req.body);
    res.json(db.getUser(u.id));
  }
  res.sendStatus(404);
});
