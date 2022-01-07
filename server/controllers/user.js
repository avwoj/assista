import mongoose from "mongoose";
import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!password || !email) {
    return res.status(422).json({ error: "Please add all the fields." });
  }
  // if (password.length < 8 || password.length > 20) {
  //     return res
  //       .status(401)
  //       .json({ error: "Please use a password between 8 and 20 characters." });
  //   }
  User.findOne({ email }).then((savedUser) => {
    if (savedUser) {
      return res
        .status(422)
        .json({ error: "An account is already registered with that email." });
    }
  });
  //bcrypt for userpassword would go here, line 33 in auth.js from snippets
  const user = new User({
    name,
    email,
    password,
  });

  user
    .save()
    .then((user) => {
      res.json({ message: "Saved successfully." });
    })
    .catch((error) => {
      console.log(error);
    });
};
