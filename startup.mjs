import { dirname } from "path";
import { fileURLToPath } from "url";

import Blockchain from "./models/Blockchain.mjs";
import FileHandler from "./utils/FileHandler.mjs";

global.__appdir = dirname(fileURLToPath(import.meta.url));

const NODE_URL = process.argv[3] || 'http://localhost:5000';
const PORT = +process.env.PORT || 5000;
const DIFFICULTY = +process.env.DIFFICULTY || 1;
const MINE_RATE = +process.env.MINE_RATE || 1000;

const blockchain = Blockchain.createChain('BlockedBrain');

export { NODE_URL, PORT, DIFFICULTY, MINE_RATE, blockchain };