import jwt from "jsonwebtoken";

const JWT_SECRET = String(process.env.JWT_SECRET);

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
