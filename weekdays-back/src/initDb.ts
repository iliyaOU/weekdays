import mongoose from "mongoose";
import { User } from "./models/User";
import bcrypt from "bcryptjs";
import { Schedule } from "./models/Schedule";

const initDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const hashedPassword1 = await bcrypt.hash("user1@some.com", 12);
    const hashedPassword2 = await bcrypt.hash("user2@some.com", 12);

    const user1 = new User({
      username: "user1",
      email: "user1@some.com",
      password: hashedPassword1,
    });

    const user2 = new User({
      username: "user2",
      email: "user2@some.com",
      password: hashedPassword2,
    });

    await user1.save();
    await user2.save();
    console.log("Users created successfully");
  } catch (error) {
    console.error("Error initializing DB:", error);
  } finally {
    await mongoose.disconnect();
  }
};

initDB();
