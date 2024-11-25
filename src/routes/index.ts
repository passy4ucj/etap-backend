import { Router } from "express";
import { authenticationRoutes } from "./auth-routes";
import { progressRoutes } from "./progress-routes";
import { subjectRoutes } from "./subject-routes";
import { topicRoutes } from "./topic-routes";


const router = Router();

router.use("/auth", authenticationRoutes);
router.use("/progress", progressRoutes);
router.use("/subjects", subjectRoutes);
router.use("/topics", topicRoutes);

export { router as applicationRoutes };
