import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { username, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username: username,
      password: hashedPassword,
    });

    // gen jwt token to signin and save to db
    generateTokenAndSetCookie(newUser._id, res);
    newUser.save();

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export async function signin(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    res.status(201).json({
      id: user._id,
      username: user.username,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

export function signout(req, res) {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Signed out" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}