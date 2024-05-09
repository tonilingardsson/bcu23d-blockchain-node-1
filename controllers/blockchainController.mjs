import { blockchain } from "../startup.mjs";

import ServerResponse from "../utils/ServerResponse.mjs";
import ErrorResponse from "../utils/ErrorResponse.mjs";
import FileHandler from "../utils/FileHandler.mjs";

const blockchainJSON = new FileHandler(
    "data",
    process.argv[2] ?
        `blockchain-${process.argv[2]}.json` :
        'blockchain-test.json'
);

const getBlockchain = (req, res, next) => {
    res.status(200).json(new ServerResponse({ status: 200, data: blockchain }));
};

const getAllBlocks = (req, res, next) => {
    res
        .status(200)
        .json(new ServerResponse({ status: 200, data: blockchain.chain }));
};

const getLatestBlock = (req, res, next) => {
    res
        .status(200)
        .json(new ServerResponse({ status: 200, data: blockchain.getLastBlock() }));
};

const getBlockByIndex = (req, res, next) => {
    const index = +req.params.index;
    const block = blockchain.chain[index];

    if (!block) {
        return next(
            new ErrorResponse(`Cannot find block with index ${index}`, 404)
        );
    }

    res.status(200).json(new ServerResponse({ status: 200, data: block }));
};

const mineBlock = (req, res, next) => {
    const body = req.body;

    if (!(body instanceof Object && !(body instanceof Array))) {
        return next(
            new ErrorResponse(`${JSON.stringify(body)} is not valid. It must be an object`, 400)
        );
    }

    const block = blockchain.proofOfWork(body);

    blockchainJSON.write(blockchain);

    res.status(201).json(new ServerResponse({ status: 201, data: block }));
};

const synchronizeChain = (req, res, next) => {
    const invalidChains = [];
    let nodesToCheck = blockchain.memberNodes.length;
    let syncCounter = 0;
    let maxLength = blockchain.chain.length;
    let longestChain = blockchain.chain;

    if (nodesToCheck === 0) {
        return next(
            new ErrorResponse(`The current node ${blockchain.node} is not connected to this network`, 400
            )
        );
    }

    if (!blockchain.validateChain(longestChain)) {
        return next(
            new ErrorResponse(
                `The current node ${blockchain.nodeUrl} has been compromised`,
                400
            )
        );
    }

    try {
        blockchain.memberNodes.forEach(async (member) => {
            const response = await fetch(`${member}/api/v1/blockchain`);

            if (response.ok) {
                const result = await response.json();

                if (result.data.chain.length > maxLength) {
                    maxLength = result.data.chain.length;
                    longestChain = result.data.chain;
                }

                if (longestChain !== blockchain.chain) {

                    if (!blockchain.validateChain(longestChain)) {
                        maxLength = blockchain.chain.length;
                        longestChain = blockchain.chain;

                        invalidChains.push(result.data.nodeUrl);
                    } else {
                        blockchain.chain = longestChain;
                        blockchainJSON.write(blockchain);
                        syncCounter++;
                    }
                }
                nodesToCheck--;

                if (nodesToCheck === 0) {
                    res.status(200).json(
                        new ServerResponse({
                            status: 200,
                            error:
                                invalidChains.length > 0 &&
                                `Node(s) ${invalidChains.join(', ')} has been compromised`,
                            data: {
                                message: `Synchronization completed, [${syncCounter}] change(s) has been made to the current node ${blockchain.nodeUrl}`,
                            },
                        })
                    );
                }
            }
        });
    } catch (error) {
        return next(new ErrorResponse(error, error.status));
    }

};

export {
    getBlockchain,
    getAllBlocks,
    getLatestBlock,
    getBlockByIndex,
    mineBlock,
    synchronizeChain,
};
