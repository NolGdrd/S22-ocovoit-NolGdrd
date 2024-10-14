import { Router } from "express";
import mainController from "../controllers/mainController";
import validate from "../middlewares/validation";
import { signUpSchema, signInSchema } from "../validation/schemas";
import withTryCatch from "../middlewares/withTryCatch";

const router = Router();

/**
 * @typedef {object} ErrorResponse
 * @property {string} status - The request status
 * @property {string} message - A descriptive error message
 */

/**
 * POST /api/signup
 * @summary sign up
 */
router.post(
  "/signup",
  validate(signUpSchema, "body"),
  withTryCatch(mainController.signUp)
);

/**
 * POST /api/signin
 * @summary get sign in
 */
router.post(
  "/signin",
  validate(signInSchema, "body"),
  withTryCatch(mainController.signIn)
);

/**
 * POST /api/refresh
 * @summary refresh token
 */
// router.post(
//   "/refresh",
//   validate(signInSchema, "body"),
//   withTryCatch(mainController.refresh)
// );

export default router;
