import { Router } from "express";
import userController from "../controllers/user";
import validate from "../middlewares/validation";
import { createUserSchema, modifyUserSchema } from "../validation/schemas/user";
import withTryCatch from "../middlewares/withTryCatch";
const router = Router();

/**
 * @typedef {object} ErrorResponse
 * @property {string} status - The request status
 * @property {string} message - A descriptive error message
 */

/**
 * @typedef {object} User
 * @property {number} id - User's id
 * @property {string} email - User's email
 * @property {string} password - User's password
 * @property {string} lastname - User's lastname
 * @property {string} firstname - User's firstname
 * @property {string} image - User's image
 * @property {object} roles - User's roles
 * @property {string} created_at - User's creation TS
 * @property {string} updated_at - User's last update TS
 */

/**
 * GET /api/users
 * @summary get all users
 * @tags Users
 * @return {object} 200 - success response
 * @return {ErrorResponse} 500 - internal server error
 */
router.get("/", withTryCatch(userController.getAllUsers));

/**
 * GET /api/users/{id}
 * @summary get user by id
 * @tags Users
 * @param {number} id.path - id of user
 * @return {object} 200 - success response
 * @return {ErrorResponse} 404 - error not found
 * @return {ErrorResponse} 500 - error internal server error
 */
router.get("/:id([0-9]+)", withTryCatch(userController.getUserById));

/**
 * POST /api/users
 * @summary create user
 * @tags Users
 * @return {object} 200 - success response
 * @return {ErrorResponse} 400 - bad input
 * @return {ErrorResponse} 500 - internal server error
 */
router.post(
  "/",
  validate(createUserSchema, "body"),
  withTryCatch(userController.createUser)
);

/**
 * PUT /api/users/{id}
 * @summary update user
 * @tags Users
 * @param {number} id.path - id of user
 * @return {object} 200 - success response
 * @return {ErrorResponse} 400 - bad input
 * @return {ErrorResponse} 500 - internal server error
 */
router.put(
  "/:id([0-9]+)",
  validate(modifyUserSchema, "body"),
  withTryCatch(userController.updateUser)
);

/**
 * DELETE /api/users/{id}
 * @summary delete user
 * @tags Users
 * @param {number} id.path - id of user
 * @return {object} 200 - success response
 * @return {ErrorResponse} 500 - internal server error
 */
router.delete("/:id([0-9]+)", withTryCatch(userController.deleteUser));

export default router;
