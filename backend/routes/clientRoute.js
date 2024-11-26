const express = require ("express");
const router = express.Router();
const clientController = require ("../controller/clientController");

router.get("/status/:cid", clientController.status);
router.put("/edit/:cid", clientController.edit);
router.delete("/delete/:cid", clientController.delete);
router.get("/:cid", clientController.getClient);
router.post("/new", clientController.new);
router.get("/", clientController.getClientList);

module.exports = router;
