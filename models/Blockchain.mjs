import { createHash } from "../utils/cryptoLib.mjs";
import Block from "./Block.mjs";

const Blockchain = class {
    constructor(name) {
        this.name = name || 'Blockchain';
        this.chain = [];
        this.createGenesisBlock();

        this.memberNodes = [];
        this.nodeUrl = process.argv[3];
    }

    createGenesisBlock() {

        do {
            timestamp = Date.now();
            nonce++;
            difficulty = lastBlock.difficulty;
            hash = this.hashBlock({ ...block, timestamp, nonce, difficulty });
        } while (!hash.startsWith('0'.repeat(difficulty)));

        Object.assign(block, { timestamp, hash, nonce, difficulty });

        return block;
    }

    adjustDifficulty(block) {
        let { difficulty, timestamp } = block;
        return timestamp + process.env.MINE_RATE > timestamp
            ? +difficulty + 1
            : +difficulty - 1;
    }
};

export default Blockchain;
