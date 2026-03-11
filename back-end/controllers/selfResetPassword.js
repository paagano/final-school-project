const db = require("../models/dbConnect");
const createError = require("http-errors");
const bcrypt = require("bcrypt");

//use the model:
const users = db.users;

// Controller function for self-reset-password
module.exports = {
  selfResetPassword: async (req, res) => {
    const { email, newPassword } = req.body;

    try {
      // Find user by email
      const user = await users.findOne({ where: { email } });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      // Hash the new password using bcrypt:
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update the user's password in the database
      await user.update({ password: hashedPassword });

      return res.json({
        success: true,
        message: "Password has been reset successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  },
};
