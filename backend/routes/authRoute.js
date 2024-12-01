
const express = require ("express");
const authController = require ("../controller/authController");
const router = express.Router();
const authenticateUser = require('../middleware/authenticateUser');

router.get("/initialFetch", authenticateUser, authController.initialFetch);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;