import express from "express";
import { approveRentAmount } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/approve", approveRentAmount);

export default router;
