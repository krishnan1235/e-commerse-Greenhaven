import express from "express";
import {
  registerUser,
  login,
  logout,
  getUser,
  updateUser,
  updateAddress,
  updatePassword,
  getuser,
  
} from "../controllers/auth.controller.js";

import { verifyToken,verifyAdmin } from "../middleware/auth.js"; // ✅ JWT Middleware

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/logout", logout);

// ✅ PROTECTED ROUTES
// router.get("/auth/users", verifyAdmin, getuser); 
router.get("/users", verifyToken, verifyAdmin, getuser);
router.post("/getUser", verifyToken, getUser);
router.put("/updateUser", verifyToken, updateUser);
router.put("/updateAddress", verifyToken, updateAddress);
router.put("/updatePassword", verifyToken, updatePassword);

export default router;
