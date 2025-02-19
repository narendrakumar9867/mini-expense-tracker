import express from 'express';
import User from "../models/user.js";
import { createTokenForUser } from '../services/authentication.js';

const router = express.Router();

router.get('/register', (req, res) => {
  return res.json({ msg: "register route is working."})
});

router.get('/login', (req, res) => {
  return res.json({ msg: "login route is working."})
});

router.post('/register', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if(existUser) {
      return res.status(400).json({ error:"Email already exist..."})
    }

    await User.create({
      firstname, 
      lastname,
      email,
      password,
    });
    return res.status(201).json({ message: "User registered successfully."});
  } catch(error) {
    return res.status(500).json({ error: "Internal Server issue..."})
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Incorrect email or password" });
    }
    const isMatch = await user.matchPasswordAndGenerateToken(password);
    
    if (isMatch) {
      const token = createTokenForUser(user);
      return res.json({ message: "Login successful", token });
    } else {
      return res.status(400).json({ error: "Incorrect email or password" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});



router.get('/logout', (req, res) => {
  res.clearCookie("token").redirect("/");
});

export default router;