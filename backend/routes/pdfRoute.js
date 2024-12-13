const express = require ("express");
const pdfController = require ("../controller/pdfController");
const router = express.Router();

router.post("/create", pdfController.createPdf);
router.get("/getAllPdf", pdfController.getAllPdf);
router.get("/dashboard", pdfController.dashboardData);



module.exports = router;