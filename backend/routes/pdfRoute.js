const express = require ("express");
const pdfController = require ("../controller/pdfController");
const router = express.Router();
const authenticateUser = require('../middleware/authenticateUser');
const userRole = require('../middleware/checkRole');

router.post("/changePdfStatus", pdfController.changePdfStatus);   
router.post("/create", authenticateUser,userRole, pdfController.createPdf);
router.get("/getAllPdf",authenticateUser, pdfController.getAllPdf);
router.get("/dashboard",authenticateUser, pdfController.dashboardData);
router.get("/getNoficationData",authenticateUser, pdfController.getNoficationData);
router.put("/updateNotification",authenticateUser, pdfController.updateNotification);
router.get("/allRefs",authenticateUser, pdfController.allRefs);
router.post("/sendPDF", pdfController.sendPDF);
router.get("/getQuotation",authenticateUser, pdfController.getQuotation);   




module.exports = router;