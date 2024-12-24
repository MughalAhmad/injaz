const express = require ("express");
const router = express.Router();
const userController = require ("../controller/userController");4

router.get("/getAllUsersNameAndId", userController.getAllUsersNameAndId);
router.get("/getUserList", userController.getUserList);
router.put("/assign/:uid", userController.assignToUser);
router.put("/edit/:uid", userController.edit);
router.delete("/delete/:uid", userController.delete);
router.get("/sendEmailAndPassword/:uid", userController.sendEmailAndPassword);
router.get("/:uid", userController.getUser);
router.post("/new", userController.new);

module.exports = router;
