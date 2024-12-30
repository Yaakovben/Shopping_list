import { Router } from "express";
import { addGroup, addTodo, flipStatus, getAll, getGroup, getNames, removeProduct } from "../controllers/productController";

const router = Router()
router.post("/add-group",addGroup)


router.post("/add-product",addTodo)
router.put("/change-status",flipStatus)
router.delete("/delete-product",removeProduct)
router.get("/my-product/:userId",getAll)
router.get("/group-product",getGroup)
router.get("/names-groups",getNames)


export default router