import { Router } from "express";
import userRouter from "./user";
import roleRouter from "./role";
import notFoundMiddleware from "../middlewares/notFound";

const router = Router();

router.use("/users", userRouter);
router.use("/roles", roleRouter);

router.use(notFoundMiddleware);

export default router;
