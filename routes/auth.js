const express = require("express");
const router = express.Router();
const { register, login, getUser } = require("../controllers/userController");
const { auth } = require("../middleware/auth");

router.get("/user", auth, getUser);

module.exports = router;
// This code defines the authentication routes for a Node.js application using Express.
// It includes routes for user registration, login, and fetching the authenticated user's details.
