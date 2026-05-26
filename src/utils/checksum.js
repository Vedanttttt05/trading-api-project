import crypto from "crypto";


const generateChecksum = (secret, timestamp) => {
    const input = secret + timestamp;
    return crypto.createHash("sha256").update(input).digest("hex");
};


const getEpochTimestamp = () => {
    return Math.floor(Date.now() / 1000).toString();
};

export { generateChecksum, getEpochTimestamp };