const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "6f83c59fd71a4fb75ddd39ad8d184b9c6bbd3b5941582b4696e6c912264d4087": 100, // private key: 8b0e277cccd3707c216a7274943e83679e5ae2ec78a6fd665958a82fced5ea6b
  "0dcde08c5080450a8f407fca79bf2ac1131b2b7d48741efac418a060b97e74c2": 50, // private key: 01583f92e176a6c8bae2f16426c35ff86b6aee05022c93c2c1445f26285b1ca5
  "257210de95fd1d2f4a5859cbe9a80cd71e02301a52f0a5ef0acc0dc253e695e7": 75, // private key: ea42a7811b47150fb3c6fe79c537d4fe72d11d4e212a57ad7f75a9efda9cc276
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
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
