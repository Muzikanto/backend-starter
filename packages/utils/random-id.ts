// eslint-disable-next-line
const customAlphabet = require('nanoid').customAlphabet;

export const randomId = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 24);
