import { Request, Response } from "express";
import { Role } from "../models/role";
import HttpError from "../errors/httpError";

const roleController = {
  async getAllRoles(req: Request, res: Response): Promise<void> {
    const roles = await Role.findAll();
    res.json({ status: "success", data: roles });
  },
  async getRoleById(req: Request, res: Response): Promise<void> {
    const roleId = parseInt(req.params.id, 10);
    const role = await Role.findById(roleId);
    if (!role) {
      throw new HttpError(404, "role not found");
    }
    res.json({ status: "success", data: role });
  },
  async createRole(req: Request, res: Response): Promise<void> {
    const newRole = new Role(req.body);
    await newRole.save();
    res.json({ status: "success", data: newRole });
  },
  async updateRole(req: Request, res: Response): Promise<void> {
    const roleId = parseInt(req.params.id, 10);
    const role = await Role.findById(roleId);
    if (!role) {
      throw new HttpError(404, "role not found");
    }
    Object.assign(role, req.body);
    await role.save();
    res.json({ status: "success", data: role });
  },
  async deleteRole(req: Request, res: Response): Promise<void> {
    const roleId = parseInt(req.params.id, 10);
    const result = await Role.deleteById(roleId);
    if (result) {
      res.json({ status: "success" });
    } else {
      throw new HttpError(404, "role not found");
    }
  },
};

export default roleController;
