import express from "express";
import {
  forgetUserController,
  getUserController,
  updateUserController,
} from "../controllers/userController.js";
import userAuth from "../middleware/authMiddlewaree.js";

//router object
const router = express.Router();

//routes
//Get User  || GET
router.post("/getUser", userAuth, getUserController);
// UPDATE USER || put
router.put("/update-user", userAuth, updateUserController);
//Forget User password
router.post("/forgot-password", forgetUserController);

export default router;
