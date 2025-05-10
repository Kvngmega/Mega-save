
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { phoneNumber, text } = req.body;
  const textArray = text.split('*');

  let response = '';

  const user = await User.findOne({ phone: phoneNumber });

  if (text === '') {
    response = `CON Welcome to AutoSave!
1. Register
2. Check Balance
3. Withdraw
4. Stop AutoSave`;
  } else if (text === '1') {
    if (user) {
      response = 'END You are already registered.';
    } else {
      await User.create({ phone: phoneNumber });
      response = 'END Registration successful. You will save $21 every 7 days.';
    }
  } else if (text === '2') {
    response = user
      ? `END Your current balance is $${user.balance}`
      : 'END You are not registered.';
  } else if (text === '3') {
    if (!user) {
      response = 'END You are not registered.';
    } else if (!user.canWithdraw) {
      response = 'END You cannot withdraw until 365 days of savings.';
    } else {
      user.active = false;
      response = 'END Withdrawal request submitted. Funds will be reviewed.';
      await user.save();
    }
  } else if (text === '4') {
    if (user) {
      user.active = false;
      await user.save();
      response = 'END AutoSave stopped.';
    } else {
      response = 'END You are not registered.';
    }
  } else {
    response = 'END Invalid choice.';
  }

  res.set('Content-Type: text/plain');
  res.send(response);
});

module.exports = router;
