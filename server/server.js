import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.js';
import checkforAuthenticationCookie from './middleware/authentication.js';
import dotenv from 'dotenv';

dotenv.config();

const server = express();
const PORT = process.env.PORT || 4000;

mongoose.connect("mongodb://127.0.0.1:27017/mini_expense_tracker").then(() => {
  console.log('MongoDB connected.');
}).catch((err) => {
  console.log('MongoDB connection error...', err);
})

server.use(bodyParser.json());
server.use(cors());
server.use('/user', userRoutes);
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(checkforAuthenticationCookie('token'));



server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
