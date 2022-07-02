const router = require("express").Router();
const {
  createMember,
  readMember,
  updateMember,
} = require("../controllers/member.controller");
const { check } = require("express-validator");

router.post(
  "/new",
  [
    check("email", "email is not valid :/").isEmail(),
    check("password", "password is not valid :(").isLength({ min: 6 }),
  ],
  createMember
);
router.get("/", readMember);
router.put("/:id", updateMember);

module.exports = router;
