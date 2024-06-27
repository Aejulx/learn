const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/signup", authController.signup);

// Tip - make sure to use verifyToken in all routes. Its protects the routes or || use CorsOrigin it super best AND convenient.
router.get("/profile", verifyToken, authController.getUser);

module.exports = router;
