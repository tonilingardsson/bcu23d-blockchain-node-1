import express from "express";
import { createNewBlock, getAllBlocks } from "../controllers/blockController.mjs";

const router = express.Router();

router.route('/').get(getAllBlocks).post(createNewBlock);

export default router;