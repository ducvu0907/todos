import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// get user info
export async function getUser(req, res) {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ error: "Invalid user" });
    }
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    res.status(200).json(user);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

// change password
export async function updateUser(req, res) {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ error: "Invalid user" });
    }
    const newPassword = req.body.password;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // hash password again before saving to db
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}