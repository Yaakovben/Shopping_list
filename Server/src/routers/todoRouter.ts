import { Router } from "express";
import { addTodo, flipStatus } from "../controllers/todoController";

const router = Router()
router.post("/add-todo",addTodo)
router.put("/change-status",flipStatus)

export default router