import { Router } from "express";
import { addTodo, flipStatus, getAll, removeTodo } from "../controllers/todoController";

const router = Router()
router.post("/add-todo",addTodo)
router.put("/change-status",flipStatus)
router.delete("/delete-todo",removeTodo)
router.get("/get-all",getAll)

export default router