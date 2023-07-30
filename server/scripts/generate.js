const secp = require("ethereum-cryptography/secp256k1.js");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.secp256k1.utils.randomPrivateKey();
console.log('private key 1:', toHex(privateKey));

// const publicKey = keccak256(secp.secp256k1.getPublicKey(privateKey).slice(1).slice(-20));
// console.log('public key 1:', toHex(publicKey));
// console.log(Object.getOwnPropertyNames(secp.secp256k1))
const pub = secp.secp256k1.getPublicKey(privateKey);
const msg = new TextEncoder().encode('hello');
const sig = secp.secp256k1.sign(msg, privateKey);
const isValid = secp.secp256k1.verify(sig, msg, pub);

console.log('private key:', toHex(privateKey));
console.log('public key:', toHex(pub));
console.log(sig);
console.log(isValid);
