import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function protect(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return response.status(401).json({
      message: "Not authorized, no token"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.userId);

    if (!user) {
    return response.status(401).json({
        message: "Not authorized, user not found"
    });
    }

    request.user = user;

    next();
  } catch (error) {
    return response.status(401).json({
      message: "Not authorized, invalid token"
    });
  }
}

export function adminOnly(request, response, next) {
  if (request.user.role !== "admin") {
    return response.status(403).json({
      message: "Admin access required"
    });
  }

  next();
}