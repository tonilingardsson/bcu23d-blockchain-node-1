import crypto from 'crypto';

const createHash = (stringtoHash) => {
    return crypto.createHash('sha256').update(stringToHash).digest('hex');
};

export { createHash };