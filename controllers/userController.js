const userService = require('../services/userService');
const { validationResult } = require('express-validator');
const { updateBalanceValidator } = require('../validators/userValidators.js');

exports.updateBalance = [
  updateBalanceValidator,
  async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId, amount } = req.body;

    try {
      const result = await userService.updateBalance(userId, amount);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

