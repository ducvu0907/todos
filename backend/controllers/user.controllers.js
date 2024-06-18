import User from "../models/user.model.js";

// get user
export async function getUser(req, res) {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

// update user
export async function updateUser(req, res) {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}