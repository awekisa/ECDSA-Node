import { useState } from "react";
import { getAddress, hashMessage } from "./scripts/cryptoUtils";
import { getPublicKeyFromExternalWallet, getBalance} from "./scripts/cryptoUtils";

function Wallet({ address, setAddress, balance, setBalance }) {
  const [password, setPassword] = useState("");
  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function unlock(evt) {
    evt.preventDefault();

    if (password) {
      const publicKey = await getPublicKeyFromExternalWallet(password);
      if (publicKey) {
        const address = getAddress(publicKey);
        setAddress(address);

        const balance = await getBalance(address);
        if (balance) {
          setBalance(balance);
        } else {
          setBalance(0);
        }
      } else {

      setAddress("");
      setBalance(0);
      }
    }
  }

  return (
    <form className="container wallet" onSubmit={unlock}>
      <h1>Your Wallet</h1>

      <label>
        Password:
        <input 
          placeholder="Type a password:" 
          value={password}
          onChange={setValue(setPassword)} ></input>
      </label>

      <div className="address">Address: {address}</div>
      <div className="balance">Balance: {balance}</div>
      <input type="submit" className="button" value="Unlock" />
    </form>
    
  );
}


export default Wallet;
