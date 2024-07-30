import express from "express";
import { testController } from "../controllers/testcontroller.js";
import userAuth from "../middleware/authMiddlewaree.js";
//router object
const router = express.Router();

//routes
router.post("/test-post", userAuth, testController);

//export
export default router;
