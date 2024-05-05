import { Router } from "express";
import {
    getBlockByIndex,
    getBlockchain,
    getLatestBlock,
    mineBlock,
    synchronizeChain,
} from "../controllers/blockchainController.mjs";

const router = Router();

router.route('/').get(getBlockchain);

router.route('/latest').get(getLatestBlock);

router.route('/:index').get(getBlockByIndex);

router.route('/mine').post(mineBlock);

router.route('/consensus').get(synchronizeChain)

export default router;
