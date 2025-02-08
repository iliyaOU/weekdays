import { Request, Response } from "express";
import { User, IUser } from "../models/User";
import { generateToken } from "../utils/jwt";

export const login = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = (await User.findOne({ email })) as IUser;
    if (!user) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    const token = generateToken(user._id.toString());
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error });
  }
};
