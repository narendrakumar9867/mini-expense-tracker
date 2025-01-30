import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.js';
import checkforAuthenticationCookie from './middleware/authentication.js';

const server = express();

mongoose.connect("mongodb://127.0.0.1:27017/mini_expense_tracker")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(checkforAuthenticationCookie('token'));
server.use('/user', userRoutes);


server.listen(4000, () => console.log(`Server running on port ${4000}`));
