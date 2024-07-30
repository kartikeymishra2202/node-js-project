import userModel from "../models/userModel.js";

export const registercontroller = async (req, res, next) => {
  const { name, email, password, lastName } = req.body;
  //validate
  if (!name) {
    next("please provide name");
  }
  if (!email) {
    next("please provide email");
  }

  if (!password) {
    next("please provide password");
  }

  const exisitingUser = await userModel.findOne({ email });
  if (exisitingUser) {
    next("Email is duplicate please provide a unique one");
  }

  const user = await userModel.create({ name, email, password, lastName });
  const token = user.createJWT();
  res.status(201).send({
    success: true,
    message: "user created successfully",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  //validation
  if (!email || !password) {
    next("please provide all fields");
  }

  //find user by email
  const user = await userModel.findOne({ email });
  if (!user) {
    next("invalid Username or password");
  }
  //compare the password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next("invalid Username or password");
  }
  user.password = undefined;
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "login successfully",
    user,
    token,
  });
};
