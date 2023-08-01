const secp = require("ethereum-cryptography/secp256k1.js");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

require('dotenv').config();

const privateKey = secp.secp256k1.utils.randomPrivateKey();
console.log('private key 1:', toHex(privateKey));

