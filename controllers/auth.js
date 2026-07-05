import User from "../model/User.js";
import { generateToken } from "../utils/generateToken.js";
export const register = async (req, res, next) => {
  const { name, email, password, role, profilePic } = req.body;

  try {
    const exist = await User.findOne({ email });
    if (exist)
      return res.status(400).json({
        message: "Email already in use",
      });
    const user = await User.create({ name, email, password, role, profilePic });
    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Invalid email or password" });
    const token = generateToken(user._id);
    res.json({ token, user });
  } catch (error) {
    next(error);
  }
};
