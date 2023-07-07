import parseJson from "../../util/parseJson.js";
import { db } from "../../db/config/index.js";
import { getRowById } from "../../util/simpleQueries.js";

const getServers = async (req, res) => {
  try {
    const dbQuery = "SELECT * FROM servers";
    const data = await db.query(dbQuery);
    res.json(parseJson(data));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addServer = async (req, res) => {
  const { name } = req.body;

  try {
    const dbQuery = `INSERT INTO servers(name) VALUES ('${name}')`;

    const data = await db.query(dbQuery);

    if (data.affectedRows > 0) {
      const serverData = await getRowById("servers", parseInt(data.insertId));
      res.json(parseJson(serverData));
    } else {
      throw new Error("Internal server error");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateServer = async (req, res) => {
  const body = req.body;

  let keyValue = "";

  Object.keys(body).forEach((key, index, array) => {
    keyValue += `${key}='${body[key]}'`;

    if (index === array.length - 1) return;

    keyValue += ",";
  });

  try {
    const dbQuery = `UPDATE servers SET ${keyValue} WHERE id = ?`;
    await db.query(dbQuery, [body.id]);

    res.json({ updated: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
const removeServer = async (req, res) => {
  const { id } = req.body;

  try {
    const dbQuery = "DELETE FROM servers WHERE id = ?";
    const data = await db.query(dbQuery, [id]);
    res.json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addServer, getServers, updateServer, removeServer };
