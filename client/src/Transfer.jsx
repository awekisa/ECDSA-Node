import { useState } from "react";
import server from "./server";
import { hashMessage, signTransaction, getPublicKeyFromExternalWallet, getAddress } from "./scripts/cryptoUtils";

BigInt.prototype.toJSON = function() { return this.toString() }

function Transfer({ setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [password, setPassword] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    let senderPublicKey;
    let senderAddress;

    // fetch public key
    if (password) {
      senderPublicKey = await getPublicKeyFromExternalWallet(password);
      senderAddress = getAddress(senderPublicKey);

      if (!senderPublicKey) {
        alert("No public key!")
      }
    }

    // sign transaction
    const msg = `${senderAddress} sent ${sendAmount} to ${recipient}`;
    const hashedMsg = hashMessage(msg);
    let signature = await signTransaction(password, hashedMsg);
      if (!signature) {
        alert("No signature!");
      }

    // send transaction
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: senderPublicKey,
        amount: parseInt(sendAmount),
        signature: signature,
        hashedMessage: hashedMsg,
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Password:
        <input placeholder="Type a password:" 
        value={password} 
        onChange={setValue(setPassword)}></input>
      </label>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
