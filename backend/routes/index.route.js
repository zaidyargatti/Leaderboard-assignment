import { Router } from "express";
import { addUser, getAllUsers } from "../controllers/user.controller.js";
import { claimPoints,getClaimHistory } from "../controllers/claim.controller.js";

const route= Router()

route.get('/users',getAllUsers)
route.post('/users',addUser)
route.post('/claim', claimPoints)
route.get('/history', getClaimHistory);
export default route