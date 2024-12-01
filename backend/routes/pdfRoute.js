const express = require ("express");
const pdfController = require ("../controller/pdfController");
const router = express.Router();

router.post("/create", pdfController.createPdf);
router.get("/getAllPdf", pdfController.getAllPdf);


module.exports = router;