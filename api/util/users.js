import { db } from "../db/config/index.js";
const getUserById = async (userId) => {
  console.log("ID", userId);
  try {
    const dbQuery = "select * from users where userId = ?";

    const data = await db.query(dbQuery, [userId]);
    console.log(data);
    if (data.length > 0) {
      return { ...data[0], userId: parseInt(data[0].userId) };
    }
  } catch (error) {
    console.log(error);
  }
};

export { getUserById };
