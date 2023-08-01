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


****************************************
Developers notes

Added pseudo wallet (api realy) that holds private keys so that they are not exposed to client and server.
Client unlocks the wallet with password and signs the transactions (password is required for that again) by making api calls to the wallet.
Server validates transactions with signature from the client.

1. run 'npm install dotenv' on both 'client' and 'server'.
2. create .env file on on both 'client' and 'server'
3. add .env files to .gitignore in both 'client' and 'server' in order to not commit the private keys
4. add private keys to .env files as a key-value pair: 
    private_key_1=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    private_key_2=yyyyyyyyyyyyyyyyyyyyyyyyyyyyyy

    

