import jwt from "jsonwebtoken";
import User from "../model/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const user = await User.findById(decoded.userId).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Error in protectRoute middleware:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
