import express from "express";
import {
  adminLogin,
  approvedCommentById,
  deleteCommentById,
  getAllBlogsAdmin,
  getAllComments,
  getDashboard,
} from "../controllers/adminController.js";
import auth from "../middlewares/auth.js";
const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", getAllComments);
adminRouter.get("/blogs", getAllBlogsAdmin);
adminRouter.delete("/delete-comment/:id", auth, deleteCommentById);
adminRouter.post("/approve-comment/:id", auth, approvedCommentById);
adminRouter.get("/dashboard", auth, getDashboard);

export default adminRouter;
