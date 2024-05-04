import { blockchain } from '../startup.mjs'

const getBlockchain = (req, res, next) => {
    res.json({ data: blockchain });
};

const getLatestBlock = (req, res, next) => {
    res.json({ data: blockchain.getLastBlock() });
};

const getBlockByIndex = (req, res, next) => {
    const index = +req.params.index
    const block = blockchain.chain[index];

    if (!block) {
        res.json({ error: `Cannot find block with index ${index}` });
        return;
    }
    res.json({ data: block });
};

const mineBlock = (req, res, next) => {
    const block = blockchain.createBlock(req.body);
    blockchain.proofOfWork(block);

    res.json({ data: block });
};

export { getBlockchain, getLatestBlock, getBlockByIndex, mineBlock };