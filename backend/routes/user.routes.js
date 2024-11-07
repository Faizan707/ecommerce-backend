import express from "express";
import { createUser} from "../controllers/createUser.js";
import { loginUser } from "../controllers/loginUser.js";
import { checkAdmin,authenticateToken} from "../middleware/auth.js";
import { getAllUsers, getUsersById } from "../controllers/fetchUser.js";
const router = express.Router()

router.post('/create-user',createUser)
router.post('/login-user',loginUser)
router.get("/users",authenticateToken,checkAdmin,getAllUsers)
router.get("/users/:userId",authenticateToken,getUsersById)
export default router