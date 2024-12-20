const express = require ("express");
const router = express.Router();
const userController = require ("../controller/userController");

router.get("/getAllUsersNameAndId", userController.getAllUsersNameAndId);
router.get("/getUserList", userController.getUserList);
router.put("/assign/:uid", userController.assignToUser);
router.put("/edit/:uid", userController.edit);
router.delete("/delete/:uid", userController.delete);
router.get("/:uid", userController.getUser);
router.post("/new", userController.new);

module.exports = router;
