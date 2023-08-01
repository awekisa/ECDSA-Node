import server from "../server";
import externalWallet from "../externalWallet";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function getAddress(publicKey) {
    if (!publicKey){
        return "";
    }

    var bytes = utf8ToBytes(publicKey).slice(1);
    var hash = toHex(keccak256(bytes).slice(-20));

    return hash;
}
  
function hashMessage(message) {
    let messageToBytes = utf8ToBytes(message);
    return toHex(keccak256(messageToBytes));
}

async function getPublicKeyFromExternalWallet(password) {
    if (password){
       const {
          data: { publicKey },
      } = await externalWallet.post(`auth`, {
        password: password
      });
      if (publicKey) {
        return publicKey;
      } else {
        return "";
      }
    } 
}

async function getBalance(address) {
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);

      if (balance) {
        return balance;
      } else {
        return "";
      }      
  }
}

async function signTransaction(password, message) {
    if (password) {
        const {
           data: { stringifiedSignature },
       } = await externalWallet.post(`sign`, {
         password: password,
         message: message
       });

       if (stringifiedSignature) {
         return stringifiedSignature;
       } else {
         return "";
       }
    } 
}

export { getAddress, hashMessage, getPublicKeyFromExternalWallet, getBalance, signTransaction }