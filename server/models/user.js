import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER",
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.matchPasswordAndGenerateToken = async function (enteredPassword) {
    try {
      const isMatch = await bcrypt.compare(enteredPassword, this.password); 
      return isMatch;
    } catch (error) {
      throw new Error("Password comparison failed");
    }
  };

const User = mongoose.model("User", userSchema);

export default User;