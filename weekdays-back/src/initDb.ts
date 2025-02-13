import { User } from "./models/User";

export const initDB = async () => {
  try {
    const users = await User.find();

    if (!users.length) {
      const user1 = new User({
        username: "user1",
        email: "user1@some.com",
        password: "user1@some.com",
      });

      const user2 = new User({
        username: "user2",
        email: "user2@some.com",
        password: "user2@some.com",
      });

      await user1.save();
      await user2.save();
    }
    console.log("Users created successfully");
  } catch (error) {
    console.error("Error initializing DB:", error);
  }
};
