import { Router } from "express";
import { addProduct, changeDetailsAndAmount, changeStatus, deleteProduct, getAllProduct } from "../controllers/productController";

const router = Router()

router.post("/add-product",addProduct)
router.put("/change-status",changeStatus)
router.put("/change-details",changeDetailsAndAmount)
router.delete("/delete-product",deleteProduct)
router.get("/get-all-products/:group",getAllProduct)


export default router