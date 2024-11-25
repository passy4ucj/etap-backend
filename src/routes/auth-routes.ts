import { Router } from "express";
import { adminRegisterUserController, currentUser, getAllUserController, getUserController, loginUserController, 
    userUpdatePasswordController } from "../controllers/auth-controller";

import {
  validateRequestMiddleware,
} from "../helpers";
import { currentUserMiddleware, requireAuthMiddleware } from "../middleware";
import { loginSchema, registerUserSchema } from "../schema/auth";


const router = Router();

// sign in route
router
  .route("/signin-user")
  .post(loginSchema(), validateRequestMiddleware, loginUserController);

// current user route
router.route("/current-user").get(currentUserMiddleware, currentUser);

router
  .route("/admin-register-user")
  .post(
    registerUserSchema(),
    validateRequestMiddleware,
    adminRegisterUserController
  );
// protected routes
router.use(currentUserMiddleware, requireAuthMiddleware);

router
    .route("/update-password")
    .patch(
      validateRequestMiddleware,
      userUpdatePasswordController
    );

router.route("/users").get(getAllUserController);

router.route("/users/user/:userID").get(getUserController);

export { router as authenticationRoutes };
