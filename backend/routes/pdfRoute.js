const express = require ("express");
const pdfController = require ("../controller/pdfController");
const router = express.Router();

router.get("/changePdfStatus/:token", pdfController.changePdfStatus);   
router.post("/create", pdfController.createPdf);
router.get("/getAllPdf", pdfController.getAllPdf);
router.get("/dashboard", pdfController.dashboardData);
router.get("/getNoficationData", pdfController.getNoficationData);
router.put("/updateNotification", pdfController.updateNotification);
router.get("/allRefs", pdfController.allRefs);
router.post("/sendPDF", pdfController.sendPDF);
router.get("/getQuotation", pdfController.getQuotation);   




module.exports = router;