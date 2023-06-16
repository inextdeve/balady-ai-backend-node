import parseJson from "../../util/parseJson.js";
import { db } from "../../db/config/index.js";

const getCameras = async (req, res) => {
  try {
    const dbQuery = "SELECT * FROM cameras";
    const data = await db.query(dbQuery);
    console.log(data);
    res.json(parseJson(data));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addCamera = async (req, res) => {
  const { name } = req.body;

  try {
    const dbQuery = `INSERT INTO cameras(name) VALUES ('${name}')`;
    const data = await db.query(dbQuery);
    console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeCamera = async (req, res) => {
  const { id } = req.body;

  try {
    const dbQuery = "DELETE FROM cameras WHERE cameraId = ?";
    const data = await db.query(dbQuery, [id]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCamera = async (req, res) => {
  const body = req.body;

  let keyValue = "";

  for (key in body) {
    query2 += `${key}=${updateData[key]},`;
  }

  try {
    const dbQuery = `UPDATE cameras SET ${keyValue} WHERE cameraId = ?`;
    const data = await db.query(dbQuery, [id]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addCamera, getCameras, removeCamera, updateCamera };
