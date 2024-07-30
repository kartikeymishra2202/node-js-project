import express from "express";
import {
  createJobController,
  deleteJobsController,
  getAllJobsController,
  jobsStatsCOntroller,
  updateJobsController,
} from "../controllers/jobController.js";
import userAuth from "../middleware/authMiddlewaree.js";

const router = express.Router();

//router
//create Job ||post
router.post("/create-job", userAuth, createJobController);

//get  jobs || get
router.get("/get-job", userAuth, getAllJobsController);

//update Jobs || PUT || PATCH
router.patch("/update-job/:id", userAuth, updateJobsController);

//delete...............................
router.delete("/delete-job/:id", userAuth, deleteJobsController);

//Job stats
router.get("/job-stats", userAuth, jobsStatsCOntroller);

export default router;
