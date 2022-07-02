const Member = require("../model/member.model");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

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

module.exports = { createMember, readMember };
