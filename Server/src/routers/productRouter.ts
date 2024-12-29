import { Router } from "express";
import { addTodo, flipStatus, getAll, getGroup, getNames, removeTodo } from "../controllers/productController";

const router = Router()
router.post("/add-product",addTodo)
router.put("/change-status",flipStatus)
router.delete("/delete-product",removeTodo)
router.get("/my-product",getAll)
router.get("/group-product",getGroup)
router.get("/names-groups",getNames)


export default router