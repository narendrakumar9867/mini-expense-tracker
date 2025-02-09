import express from 'express';
import User from "../models/user.js";
import { createTokenForUser } from '../services/authentication.js';

const router = express.Router();

router.get('/user/register', (req, res) => {
  return res.render('register');
});

router.get('/user/login', (req, res) => {
  return res.render('login');
});

router.post('/user/register', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  await User.create({
    firstname, 
    lastname,
    email,
    password,
  });
  return res.redirect("/");
});

router.post('/user/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.matchPasswordAndGenerateToken(email, password);
    if (user) {
      const token = createTokenForUser(user); 
      return res.cookie("token", token).redirect("/");
    } else {
      return res.render("login", { error: "Incorrect email or password" });
    }
  } catch (error) {
    return res.render("login", { error: "Incorrect email or password" });
  }
});

router.get('/user/logout', (req, res) => {
  res.clearCookie("token").redirect("/");
});

export default router;