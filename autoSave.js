
const User = require('../models/User');

module.exports = async () => {
  const users = await User.find({ active: true });

  for (const user of users) {
    const success = true;

    if (success) {
      user.balance += 20;
      user.totalSaved += 20;
      user.lastSavedAt = new Date();

      const days = Math.floor((new Date() - user.joinedAt) / (1000 * 60 * 60 * 24));
      if (days >= 365) user.canWithdraw = true;

      await user.save();
      console.log(`Saved $20 for ${user.phone}`);
    }
  }
};
