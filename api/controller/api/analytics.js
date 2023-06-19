import { db } from "../../db/config/index.js";

const getAnalyticModules = async (req, res) => {
  const dbQuery = "SELECT * FROM analyticmodules";
  try {
    const data = await db.query(dbQuery);
    res.json(data);
  } catch (error) {
    res.status(500);
  }
};

export { getAnalyticModules };
