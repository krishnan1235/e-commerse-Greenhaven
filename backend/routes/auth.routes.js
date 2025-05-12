import express from "express";
import { registerUser, login, logout, getUser, updateUser,updateAddress,updatePassword,getuser} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);


router.post("/login", login);
router.post("/getUser", getUser);    
router.put("/updateUser", updateUser);


router.put("/updateAddress", updateAddress);
router.put("/updatePassword", updatePassword);
router.get("/users", getuser);

router.post("/logout", logout);

export default router;
