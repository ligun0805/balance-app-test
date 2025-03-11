const { sequelize, User } = require("../models");

exports.updateBalance = async (userId, amount) => {
  const result = await sequelize.query(
    'UPDATE "Users" SET "balance" = "balance" + :amount WHERE "id" = :userId AND "balance" + :amount >= 0 RETURNING *',
    {
      replacements: { userId, amount },
      type: sequelize.QueryTypes.UPDATE,
    }
  );
  // Check if the result contains any rows
  if (result[0].length === 0) {
    throw new Error("Insufficient funds");
  }

  return result[0]; // Return the updated user data
};
