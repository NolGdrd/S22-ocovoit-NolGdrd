import { Router } from "express";
import roleController from "../controllers/role";
import validate from "../middlewares/validation";
import { createRoleSchema, modifyRoleSchema } from "../validation/schemas/role";
import withTryCatch from "../middlewares/withTryCatch";
const router = Router();

/**
 * @typedef {object} ErrorResponse
 * @property {string} status - The request status
 * @property {string} message - A descriptive error message
 */

/**
 * @typedef {object} Role
 * @property {number} id - Role's id
 * @property {string} name - Role's name
 */

/**
 * GET /api/roles
 * @summary get all roles
 * @tags Roles
 * @return {array<Role>} 200 - success response
 * @return {ErrorResponse} 500 - internal server error
 */
router.get("/", withTryCatch(roleController.getAllRoles));

/**
 * GET /api/roles/{id}
 * @summary get role by id
 * @tags Roles
 * @param {number} id.path - id of role
 * @return {object} 200 - success response
 * @return {ErrorResponse} 404 - error not found
 * @return {ErrorResponse} 500 - error internal server error
 */
router.get("/:id([0-9]+)", withTryCatch(roleController.getRoleById));

/**
 * POST /api/roles
 * @summary create role
 * @tags Roles
 * @return {object} 200 - success response
 * @return {ErrorResponse} 400 - bad input
 * @return {ErrorResponse} 500 - internal server error
 */
router.post(
  "/",
  validate(createRoleSchema, "body"),
  withTryCatch(roleController.createRole)
);

/**
 * PUT /api/roles/{id}
 * @summary update role
 * @tags Roles
 * @param {number} id.path - id of role
 * @return {object} 200 - success response
 * @return {ErrorResponse} 400 - bad input
 * @return {ErrorResponse} 500 - internal server error
 */
router.put(
  "/:id([0-9]+)",
  validate(modifyRoleSchema, "body"),
  withTryCatch(roleController.updateRole)
);

/**
 * DELETE /api/roles/{id}
 * @summary delete role
 * @tags Roles
 * @param {number} id.path - id of role
 * @return {object} 200 - success response
 * @return {ErrorResponse} 500 - internal server error
 */
router.delete("/:id([0-9]+)", withTryCatch(roleController.deleteRole));

export default router;
