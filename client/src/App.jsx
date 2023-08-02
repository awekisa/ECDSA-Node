import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import { hashMessage } from "./scripts/cryptoUtils";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="app">
      <Wallet
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        password={password}
        setPassword={setPassword}
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer hashedPassword={hashMessage(password)} loggedIn={loggedIn} setBalance={setBalance} address={address} />
    </div>
  );
}

export default App;
