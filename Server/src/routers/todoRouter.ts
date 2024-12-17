import { Router } from "express";
import { addTodo, flipStatus, getAll, getGroup, getNames, removeTodo } from "../controllers/todoController";

const router = Router()
router.post("/add-todo",addTodo)
router.put("/change-status",flipStatus)
router.delete("/delete-todo",removeTodo)
router.get("/my-todos",getAll)
router.get("/group-todos",getGroup)
router.get("/names-groups",getNames)


export default router