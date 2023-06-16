import parseJson from "../../util/parseJson.js";
import { db } from "../../db/config/index.js";
import { getCameraById } from "../../util/simpleQueries.js";

const getCameras = async (req, res) => {
  try {
    const dbQuery = "SELECT * FROM cameras";
    const data = await db.query(dbQuery);

    res.json(parseJson(data));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addCamera = async (req, res) => {
  const { name } = req.body;

  try {
    const dbQuery = `INSERT INTO cameras(name, auth) VALUES ('${name}', '{"username": "", "password": ""}')`;
    const data = await db.query(dbQuery);

    if (data.affectedRows > 0) {
      const cameraData = await getCameraById(parseInt(data.insertId));
      res.json(parseJson(cameraData));
    } else {
      throw new Error("Internal server error");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeCamera = async (req, res) => {
  const { id } = req.body;

  try {
    const dbQuery = "DELETE FROM cameras WHERE id = ?";
    const data = await db.query(dbQuery, [id]);
    res.json({ removed: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCamera = async (req, res) => {
  const body = req.body;

  let keyValue = "";

  Object.keys(body).forEach((key, index, array) => {
    if (typeof body[key] === "object") {
      keyValue += `${key}='${JSON.stringify(body[key])}'`;
    } else {
      keyValue += `${key}='${body[key]}'`;
    }

    if (index === array.length - 1) return;

    keyValue += ",";
  });
  console.log(keyValue);

  try {
    const dbQuery = `UPDATE cameras SET ${keyValue} WHERE id = ?`;
    await db.query(dbQuery, [body.id]);

    res.json({ updated: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export { addCamera, getCameras, removeCamera, updateCamera };
