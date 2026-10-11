import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";



export async function registerUser(request, response, next) { 
    try {
      const { name, email, password } = request.body || {};
        if (
            name === undefined ||
            email === undefined ||
            password === undefined
        ) {
            return response.status(400).json({
                message: "Name, email and password are required"
            });
      }
      if (password.length < 8) {
        return response.status(400).json({
          message: "Password must be at least 8 characters"
        });
      }
      const normalizedEmail = email.trim().toLowerCase();
      const existingUser = await User.findOne({
                              email: normalizedEmail
                            });

      if (existingUser) {
          return response.status(409).json({
              message: "User with this email already exists"
          });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
                            name,
                            email: normalizedEmail,
                            password: hashedPassword
                          });
      response.status(201).json({
                              _id: newUser._id,
                              name: newUser.name,
                              email: newUser.email
                            });
    } catch (error) {
    next(error);
  }
}

export async function loginUser(request, response, next) {
  try {
    const { email, password } = request.body || {};

    if (
      email === undefined ||
      password === undefined
    ) {
      return response.status(400).json({
        message: "Email and password are required"
      });
    }
    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({
                          email: normalizedEmail
                        });
    if (!user) {
      return response.status(401).json({
          message: "Invalid email or password"
      });
  
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
        return response.status(401).json({
            message: "Invalid email or password"
        });
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
      response.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
    });
  } catch (error) {
    next(error);
  }
}