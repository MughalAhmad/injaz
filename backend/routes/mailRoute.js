
const express = require ("express");
const mailController = require ("../controller/mailController");
const router = express.Router();

router.get("/teammail", mailController.teamMail);
router.get("/googleMail", mailController.googleMail);

module.exports = router;