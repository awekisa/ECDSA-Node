import Unlock from "./Unlock";
import Logout from "./Logout";
import { getAddress } from "./scripts/cryptoUtils";
import { getPublicKeyFromExternalWallet, getBalance } from "./scripts/cryptoUtils";


function Wallet({ loggedIn, setLoggedIn, password, setPassword, address, setAddress, balance, setBalance }) {
  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function unlock(evt) {
    evt.preventDefault();

    if (password) {
      const publicKey = await getPublicKeyFromExternalWallet(password);
      if (publicKey) {
        setLoggedIn(true);
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
      setLoggedIn(false);
      }
    }
  }

  async function logout(evt) {
    evt.preventDefault();

    setLoggedIn(false);
    setPassword("");
  }

  if (loggedIn) {
    return <Logout 
      address={address}
      balance={balance}
      logout={logout}
    />;
  } else {
    return <Unlock 
      password={password}
      setPassword={setPassword}
      unlock={unlock}
      setValue={setValue}
    />;
  }
}

export default Wallet;
