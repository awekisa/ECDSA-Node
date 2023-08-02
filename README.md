## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

### Wallet

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/wallet` folder 
2. Run `npm install` to install all the depedencies
3. Add .env file in wallet project to hold user passwords and private keys in format pass=privateKey
4. Run `node index` to start the server 

The application should connect to the default server port (3000) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

****************************************
Developers notes

Added pseudo wallet that holds all private keys so that they are not exposed to client or server.
Users unlock the wallet with a password. Passwords are stored in .env file in the wallet project. (.env file is added to .gitignore so it won't be commited)
When users make a transaction, few new things are happening:
    - by clicking Transfer button user is prompt to confirm his password and click Sign Transaction button. 
    - then client calls the wallet and receives signature for the signed transaction.
    - then client calls the server and server validates transaction with the signature from the client.

NB: the balances in server/index.js need to be adjusted with respective addresses when new passwords/private keys are generated and added in wallet/.env



    

