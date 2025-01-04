import { Router } from "express";
import { addGroup, getAllMyLists, joinToGroup, leftGroup} from "../controllers/buyingGroupController";

const router = Router()
router.post("/add-group",addGroup)
router.put("/join-to-group",joinToGroup)
router.get("/all-lists/:username",getAllMyLists)
router.put("/left-group",leftGroup)



// router.put("/change-status",flipStatus)
// router.delete("/delete-product",removeProduct)
// router.get("/my-product/:userId",getAll)
// router.get("/group-product",getGroup)
// router.get("/names-groups",getNames)

export default router