import { useState } from "react";
import server from "./server";
import { hashMessage, signTransaction, getPublicKeyFromExternalWallet, getAddress } from "./scripts/cryptoUtils";

BigInt.prototype.toJSON = function() { return this.toString() }

function Transfer({ hashedPassword, loggedIn, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [isTransactionSent, setIsTransactionSent] = useState(false);
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function sign(evt) {
    evt.preventDefault();
    setIsTransactionSent(true);
  }

  async function transfer(evt) {
    evt.preventDefault();

    if (hashedPassword !== hashMessage(confirmedPassword)){
      alert("Wrong password!");
      return;
    }

    let senderPublicKey;
    let senderAddress;

    // fetch public key
    if (confirmedPassword) {
      senderPublicKey = await getPublicKeyFromExternalWallet(confirmedPassword);
      senderAddress = getAddress(senderPublicKey);

      if (!senderPublicKey) {
        alert("No public key!")
        return;
      }

      // sign transaction
      const msg = `${senderAddress} sent ${sendAmount} to ${recipient}`;
      const hashedMsg = hashMessage(msg);
      let signature = await signTransaction(confirmedPassword, hashedMsg);
      if (!signature) {
        alert("No signature!");
      }

      if (signature) {
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
          setIsTransactionSent(false);
          setConfirmedPassword("");
        } catch (ex) {
          alert(ex);
          return;
        }
      }
    } 
  }

  if (loggedIn) {
    if (isTransactionSent) {
      return (
        <form className="container transfer" onSubmit={transfer}>
          <h1>Send Transaction</h1>
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

          <label>
            Password:
            <input placeholder="Confirm password:" 
            value={confirmedPassword} 
            onChange={setValue(setConfirmedPassword)}></input>
          </label>
    
          <input type="submit" className="button" value="Sign Transaction" />
        </form>
      );
    } else {
      return (
        <form className="container transfer" onSubmit={sign}>
          <h1>Send Transaction</h1>
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
  }
}

export default Transfer;
