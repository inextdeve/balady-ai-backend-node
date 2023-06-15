import { db } from "../../db/config/index.js";

const getUsers = async (req, res) => {
  try {
    const dbQuery = "SELECT * FROM users";
    const data = await db.query(dbQuery);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addUser = async (req, res) => {
  const { name } = req.body;

  try {
    const dbQuery = "INSERT INTO Users(name) VALUES ('User 2')";
    const data = await db.query(dbQuery);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeUser = async (req, res) => {
  const { id } = req.body;

  try {
    const dbQuery = "DELETE FROM Users WHERE UserId = ?";
    const data = await db.query(dbQuery, [id]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const body = req.body;

  let keyValue = "";

  for (key in body) {
    query2 += `${key}=${updateData[key]},`;
  }

  try {
    const dbQuery = `UPDATE Users SET ${keyValue} WHERE UserId = ?`;
    const data = await db.query(dbQuery, [id]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addUser, getUsers, removeUser, updateUser };
