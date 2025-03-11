const { body } = require('express-validator');
const { User } = require('../models'); // Ensure correct import

exports.updateBalanceValidator = [
  body('userId')
    .isInt().withMessage('UserId must be an integer')
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        return Promise.reject('User not found');
      }
    }),
  body('amount').isInt().withMessage('Amount must be an integer')
];