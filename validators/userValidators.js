const { body } = require('express-validator');

exports.updateBalanceValidator = [
  body('amount').isInt().withMessage('Amount must be an integer')
];