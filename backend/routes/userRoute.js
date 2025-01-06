const express = require ("express");
const router = express.Router();
const userController = require ("../controller/userController");4
const authenticateUser = require('../middleware/authenticateUser');
const userRole = require('../middleware/checkRole');

router.get("/getAllUsersNameAndId",authenticateUser,userRole, userController.getAllUsersNameAndId);
router.get("/getUserList",authenticateUser,userRole, userController.getUserList);
router.put("/assign/:uid",authenticateUser,userRole, userController.assignToUser);
router.put("/edit/:uid",authenticateUser,userRole, userController.edit);
router.delete("/delete/:uid",authenticateUser,userRole, userController.delete);
router.get("/sendEmailAndPassword/:uid",authenticateUser,userRole, userController.sendEmailAndPassword);
router.get("/:uid",authenticateUser, userController.getUser);
router.post("/new",authenticateUser,userRole, userController.new);

module.exports = router;
