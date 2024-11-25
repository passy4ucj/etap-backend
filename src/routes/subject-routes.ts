import { Router } from "express";
import {
  createSubjectController,
  getAllSubjectsController,
  getSubjectByIdController,
  updateSubjectController,
  deleteSubjectController,
  getLearnerRankingsController,
} from "../controllers/subject-controller";

import {
  validateRequestMiddleware,
} from "../helpers";
import { currentUserMiddleware, requireAuthMiddleware } from "../middleware";

const router = Router();

// Public routes
router.route("/").get(getAllSubjectsController);
router.route("/:id").get(getSubjectByIdController);

// Protected routes
router.use(currentUserMiddleware, requireAuthMiddleware);

router
  .route("/")
  .post(validateRequestMiddleware, createSubjectController);

// Get rankings for a subject
router.route("/:id/rankings").get(getLearnerRankingsController);

router
  .route("/:id")
  .put(validateRequestMiddleware, updateSubjectController)
  .delete(deleteSubjectController);

export { router as subjectRoutes };
