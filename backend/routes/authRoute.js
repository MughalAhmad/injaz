
const express = require ("express");
const authController = require ("../controller/authController");
const router = express.Router();
const authenticateUser = require('../middleware/authenticateUser');

router.get("/initialFetch", authenticateUser, authController.initialFetch);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/forgot", authController.forgot);
router.post("/checkCode", authController.checkCode);
router.post("/newPassword", authController.newPassword);

module.exports = router;