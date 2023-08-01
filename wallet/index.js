const express = require("express");
const cors = require("cors");

const secp = require("ethereum-cryptography/secp256k1.js");
const { toHex } = require("ethereum-cryptography/utils");

require('dotenv').config();

var app = express();
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.post("/auth", (req, res, next) => {
    let publicKey;
    const password = req.body.password;
    const privateKey = process.env[password];

    if (!privateKey) {
        res.send("");
    }

    publicKey = toHex(secp.secp256k1.getPublicKey(privateKey));
    res.send({publicKey});
});

app.post("/sign", (req, res, next) => {
    const privateKey = process.env[req.body.password];
    const message = req.body.message;

    if (!privateKey || !message) {
        res.send("");
    }
    
    const signature =  signTransaction(req.body.message, privateKey);
    const publicKey = secp.secp256k1.getPublicKey(privateKey);
    const isValid = secp.secp256k1.verify(signature, message, publicKey);

    if (!isValid) {
        res.send("");
    }

    const stringifiedSignature = JSON.stringify({
        ...signature,
        r: signature.r.toString(),
        s: signature.s.toString(),
      });

    res.send({stringifiedSignature});
});

function signTransaction(message, privateKey) {
    return secp.secp256k1.sign(message, privateKey);
}

BigInt.prototype.toJSON = function() { return this.toString() }