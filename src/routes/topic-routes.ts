import { Router } from "express";
import {
  createTopicController,
  getAllTopicsController,
  getTopicsBySubjectController,
  getTopicByIdController,
  updateTopicController,
  deleteTopicController,
} from "../controllers/topic-controller";

import {
  validateRequestMiddleware,
} from "../helpers";
import { currentUserMiddleware, requireAuthMiddleware } from "../middleware";

const router = Router();

// Public routes
router.route("/").get(getAllTopicsController);
router.route("/subject/:subjectId").get(getTopicsBySubjectController);
router.route("/:id").get(getTopicByIdController);

// Protected routes
router.use(currentUserMiddleware, requireAuthMiddleware);

router
  .route("/")
  .post(validateRequestMiddleware, createTopicController);

router
  .route("/:id")
  .put(validateRequestMiddleware, updateTopicController)
  .delete(deleteTopicController);

export { router as topicRoutes };
