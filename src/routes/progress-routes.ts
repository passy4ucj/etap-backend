import { Router } from "express";
import {
  createProgressController,
  getProgressByIdController,
  updateProgressController,
  getUserProgressBySubjectController,
  getRankingBySubjectController,
  deleteProgressController,
} from "../controllers/progress-controller";

import {
  validateRequestMiddleware,
} from "../helpers";
import { currentUserMiddleware, requireAuthMiddleware } from "../middleware";

const router = Router();

// Protected routes
router.use(currentUserMiddleware, requireAuthMiddleware);

// Create progress
router
  .route("/")
  .post(validateRequestMiddleware, createProgressController);

// Get progress by ID
router.route("/:id").get(getProgressByIdController);

// Update progress
router
  .route("/:id")
  .put(validateRequestMiddleware, updateProgressController);

// Get user progress for a specific subject
router
  .route("/user/:userId/subject/:subjectId")
  .get(getUserProgressBySubjectController);

// Get ranking by subject
router.route("/ranking/:subjectId").get(getRankingBySubjectController);

// Delete progress
router.route("/:id").delete(deleteProgressController);

export { router as progressRoutes };
