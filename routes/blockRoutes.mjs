import express from "express";
import {
    createNewBlock,
    getAllBlocks,
    getBlockByIndex,
} from "../controllers/blockController.mjs";

const router = express.Router();

router.route("/").get(getAllBlocks).post(createNewBlock);

router.route("/:index").get(getBlockByIndex);

export default router;
