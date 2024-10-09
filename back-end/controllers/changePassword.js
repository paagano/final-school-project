const db = require("../models/dbConnect");
const bcrypt = require("bcrypt");
const createError = require("http-errors");

// Use the model:
const users = db.users;

// Controller function for changing password
module.exports = {
  changePassword: async (req, res) => {
    const { email, currentPassword, newPassword, confirmNewPassword } =
      req.body;

    try {
      // Find user by email
      const user = await users.findOne({ where: { email } });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      // Check if current password is correct
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ success: false, message: "Current password is incorrect" });
      }

      // Check if new password and confirm password match
      if (newPassword !== confirmNewPassword) {
        return res
          .status(400)
          .json({
            success: false,
            message: "New password and confirmation do not match",
          });
      }

      // Hash the new password using bcrypt
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update the user's password in the database
      await user.update({ password: hashedPassword });

      return res.json({
        success: true,
        message: "Password has been changed successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  },
};
