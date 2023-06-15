import { db } from "../db/config/index.js";
const getUserById = async (userId) => {
  const dbQuery = "select * from users where userId = ?";

  const data = await db.query(dbQuery, [userId]);
  if (data.length > 0) {
    delete data[0].password;
    return { ...data[0], userId: parseInt(data[0].userId) };
  }
};

export { getUserById };
