import User from "../model/User.js";
export const register = async (req, res, next) => {
  const { name, email, password, role, profilePic } = req.body;

  try {
    const exist = await User.findOne({ email });
    if (exist)
      return res.status(400).json({
        message: "Email already in use",
      });
    const user = await User.create({ name, email, password, role, profilePic });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
    let {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user) return res.status(401).json({message: 'Invalid email or password'})
            res.json(user.name)
        
    } catch (error) {
        next(error)
    }
}
