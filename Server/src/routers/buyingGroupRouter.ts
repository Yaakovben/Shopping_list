import { Router } from "express";
import { addGroup, allLists, getAllMyLists, joinToGroup, leftGroup} from "../controllers/buyingGroupController";

const router = Router()
router.post("/add-group",addGroup)
router.put("/join-to-group",joinToGroup)
router.get("/all-my-lists/:username",getAllMyLists)
router.put("/left-group",leftGroup)
router.get("/get-all-groups",allLists)


export default router