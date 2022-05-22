import { db } from "./app.js";

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
    db.push("/users", data, false);
    return getUser(data[0].id);
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
