const Member = require("../model/member.model");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { validate } = require("../model/member.model");

const createMember = async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const member = new Member({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
    });
    const result = await member.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const readMember = async (req, res) => {
  try {
    const members = await Member.find({});
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json(member);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deleteMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.status(200).json("member deleted successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const signUp = async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const oldMember = await Member.findOne({ email });

    if (oldMember) {
      return res
        .status(422)
        .json({ message: "already member with this email exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const member = new Member({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
    });
    const result = await member.save();
    const token = JWT.sign(
      { email: result.email },
      process.env.SECRET_TOKEN_SIGN
    );
    res.status(201).json({ result, token });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const oldMember = await Member.findOne({ email });

    if (!oldMember) {
      return res.status(404).json({ message: "user not found" });
    }

    const hashedPassword = await bcrypt.compare(password, oldMember.password);
    if (!hashedPassword) {
      return res.status(401).json("Wrong credentials :)");
    }

    const accessToken = JWT.sign(
      { email: oldMember.email },
      process.env.SECRET_TOKEN_SIGN
    );
    res.status(200).json({ oldMember, accessToken });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  createMember,
  readMember,
  updateMember,
  deleteMember,
  signUp,
  login,
};
