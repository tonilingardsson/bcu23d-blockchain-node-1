import { blockchain } from "../startup.mjs";

import ServerResponse from "../utils/ServerResponse.mjs";
import ErrorResponse from "../utils/ErrorResponse.mjs";
import FileHandler from "../utils/FileHandler.mjs";

const getMemberNodes = (req, res, next) => {
    res
        .status(200)
        .json(new Response({ status: 200, data: blockchain.memberNodes }));
};

const createNode = (req, res, next) => {
    const node = req.body.nodeUrl;

    if (
        !(
            blockchain.memberNodes.indexOf(node) === -1 && blockchain.nodeUrl !== node
        )
    ) {
        return next(
            new ErrorResponse(
                `The node ${node} is already registered on ${blockchain}`,
                400
            )
        );
    }

    blockchain.memberNodes.push(node);
    syncMembers(node, next);

    new FileHandler("data", `blockchain-${process.argv[2]}.json`).write(
        blockchain
    );

    res.status(201).json(
        new ServerResponse({
            status: 201,
            data: {
                message: `The node ${node} has been successfully registered on ${blockchain}`,
            },
        })
    );
};

const syncMembers = (url, next) => {
    const members = [...blockchain.memberNodes, blockchain.nodeUrl];

    try {
        members.forEach(async (member) => {
            await fetch(`${url}/api/v1/members/register-node`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nodeUrl: member }),
                });
        });
    } catch (error) {
        return next(new ErrorResponse(error, error.status));
    }
};

export { getMemberNodes, createNode }