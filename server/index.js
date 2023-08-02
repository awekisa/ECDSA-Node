const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1.js");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

require('dotenv').config();

app.use(cors());
app.use(express.json());

const balances = {
  "53d14ca501a01f6e8beb47288d886ea651c4521d": 100,
  "3afca95bcee69817c36b14993aa639601736251e": 50,
  "27afabf74b980539889839c24c73df592536ec7a": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.get("/address/:password", (req, res) => {
  const { password } = req.params;
  const privateKey = process.env[password];
  let address = "";

  if (privateKey) {
    const publicKey = secp.secp256k1.getPublicKey(privateKey);
    address = toHex(getAddress(publicKey));
  }
  
  res.send({ address });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature, hashedMessage } = req.body;

  let deserializedSignature = JSON.parse(signature);
  deserializedSignature.r = BigInt(deserializedSignature.r);
  deserializedSignature.s = BigInt(deserializedSignature.s);

  let isVerified = secp.secp256k1.verify(deserializedSignature, hashedMessage, sender);

  if (!isVerified) {
    res.status(401).send({message: "Unauthorized transaction!"});
    return;
  }

  let senderAddress = getAddress(sender);
  setInitialBalance(senderAddress);
  setInitialBalance(recipient);

  if (balances[senderAddress] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[senderAddress] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[senderAddress] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function getAddress(publicKey) {
  if (!publicKey){
      return "";
  }

  var bytes = utf8ToBytes(publicKey).slice(1);
  var hash = toHex(keccak256(bytes).slice(-20));

  return hash;
}
