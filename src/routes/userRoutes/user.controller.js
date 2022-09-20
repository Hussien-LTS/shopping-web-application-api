const bcrypt = require("bcrypt");

const {
  User,
  validateRegister,
  validateLogin,
} = require("../../models/users.model");

const SALT = process.env.SALT;

const httpRegisterUserHandler = async (req, res) => {
  try {
    const { error } = validateRegister(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .json({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(SALT));

    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await new User({ ...req.body, password: hashPassword }).save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const httpLoginUserHandler = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).json({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).json({ message: "Invalid Email or Password" });

    const token = user.generateAuthToken();
    res.status(200).json({ data: token, message: "logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { httpRegisterUserHandler, httpLoginUserHandler };
