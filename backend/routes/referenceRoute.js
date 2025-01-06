const express = require ("express");
const router = express.Router();
const referenceController = require ("../controller/referenceController");
const authenticateUser = require('../middleware/authenticateUser');
const userRole = require('../middleware/checkRole');

router.get("/getReferenceList",authenticateUser,userRole, referenceController.getReferenceList);
router.put("/edit/:rid",authenticateUser,userRole, referenceController.edit);
router.delete("/delete/:rid",authenticateUser,userRole, referenceController.delete);
router.get("/:rid",authenticateUser,userRole, referenceController.getReferences);
router.post("/new",authenticateUser,userRole, referenceController.new);

module.exports = router;
