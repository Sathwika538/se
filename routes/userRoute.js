const express = require('express');
const {loginUser,registerUser} = require("../controllers/userController");
const router = express.Router();
const {authorizeRoles} = require("../middleware/auth");

router.route("/").post(loginUser)
router.route("/register").post(registerUser,authorizeRoles("admin"));



module.exports = router;