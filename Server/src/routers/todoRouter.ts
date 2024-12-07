import { Router } from "express";
import { addTodo, flipStatus, getAll, getGroup, getNames, removeTodo } from "../controllers/todoController";

const router = Router()
router.post("/add-todo",addTodo)
router.put("/change-status",flipStatus)
router.delete("/delete-todo",removeTodo)
router.get("/get-all",getAll)
router.get("/get-for-group",getGroup)
router.get("/get-names-groups",getNames)


export default router