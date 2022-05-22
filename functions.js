import { db } from "./app.js";
import * as bcrypt from "bcrypt";

function getAllUsers() {
  return db.getObject("/users");
}

function getUser(id) {
  let i = db.getIndex("/users", id);
  if (i !== -1) {
    return db.getData("/users[" + i + "]");
  }
  return;
}

function createUser(data) {
  if (!getUser(data[0].id)) {
    const salt = bcrypt.genSaltSync(10);
    data[0].pass = bcrypt.hashSync(data[0].pass, salt);
    db.push("/users", data, false);
    return 1;
  }
  return;
}

function deleteUser(id) {
  let i = db.getIndex("/users", id);
  if (i !== -1) {
    return db.delete("/users[" + i + "]");
  }
  return;
}

function updateUser(id, data) {
  let i = db.getIndex("/users", id);
  if (i !== -1) {
    db.push("/users[" + i + "]", data);
  }
  return getUser(id);
}

export { getAllUsers, getUser, createUser, deleteUser, updateUser };
