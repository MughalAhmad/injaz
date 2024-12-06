const express = require ("express");
const router = express.Router();
const referenceController = require ("../controller/referenceController");

router.put("/edit/:rid", referenceController.edit);
router.delete("/delete/:rid", referenceController.delete);
router.get("/:rid", referenceController.getReferences);
router.post("/new", referenceController.new);
router.get("/", referenceController.getReferenceList);

module.exports = router;
