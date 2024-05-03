const getBlockchain = (req, res, next) => {
    res.json({ msg: "Get blockchain" });
};

const getLatestBlock = (req, res, next) => {
    res.json({ msg: "Get latest block" });
};

const getBlockByIndex = (req, res, next) => {
    res.json({ msg: `Get block by index ${req.params.index}` });
};

const mineBlock = (req, res, next) => {
    res.json({ msg: "Mine new block" });
};

export { getBlockchain, getLatestBlock, getBlockByIndex, mineBlock };