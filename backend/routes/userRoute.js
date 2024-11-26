const express = require ("express");
const router = express.Router();
const userController = require ("../controller/userController");

router.put("/edit/:uid", userController.edit);
router.delete("/delete/:uid", userController.delete);
router.get("/:uid", userController.getUser);
router.post("/new", userController.new);
router.get("/", userController.getUserList);

module.exports = router;
