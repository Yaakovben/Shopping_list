import { Router } from "express";
import { addGroup, allLists, getAllMyLists, joinToGroup, leftGroup} from "../controllers/buyingGroupController";

const router = Router()
router.post("/add-group",addGroup)
router.put("/join-to-group",joinToGroup)
router.get("/all-my-lists/:username",getAllMyLists)
router.put("/left-group",leftGroup)
router.get("/get-all-groups",allLists)



// router.put("/change-status",flipStatus)
// router.delete("/delete-product",removeProduct)
// router.get("/my-product/:userId",getAll)
// router.get("/group-product",getGroup)
// router.get("/names-groups",getNames)

export default router