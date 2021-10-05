# About

Message encryption, decryption, and signing based on the RSA asymmetric cryptography algorithm implemented in Node.js.

# Prerequisites
Install Node.js and npm (full guide: https://nodesource.com/blog/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu/)

# Installation
1. Clone the repo
```
git clone https://github.com/rmmshv/crypto-wallet.git
```
2. Run the program
```
cd crypto-wallet
node wallet.js
```
# Usage
This is a simple implementation of the asymmetric RSA algorithm that allows users to ecrypt, decrypt, and sign messages. 
- _First, the program generates an asymmetric key pair:_
```c++
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {modulusLength: 2048, });
```
"crypto.generateKeyPairSync(type, options)" takes two arguments:<br />
   1. key type (rsa in this case) <br />
   2. key size in bits <br />
<br />

* _Next, we prompt user for data and proceed with encryption:_
```c++
let prompt = require("prompt-sync")();
let input_data = prompt("Please type the message you wish to encrypt and press enter: ");

// ENCRYPT THE DATA
let encrypted_msg = crypto.publicEncrypt(
    {
        key: publicKey, // key used to encrypt the data (generated in the previous step)
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, // OAEP padding scheme
        oaepHash: "sha256", // SHA256 hashing algorithm
    },
    Buffer.from(input_data) // convert data from string to buffer format
);

// display the output
console.log('\nYour encrypted message is:\n\n', encrypted_msg.toString("base64"), '\n');

```
"crypto.publicEncrypt(key, buffer)" method uses: <br />
  1. a PEM encoded key, <br />
  2. Optimal Asymmetric Encryption Padding (OAEP) scheme, <br />
  3. SHA256 hashing algorithm, <br />
  4. Buffer to convert data from string to buffer format. <br />
<br />

+ _Signing_
```c++
let signed_msg = input_data; // data to sign

// generate a signature
let signature = crypto.sign("sha256", Buffer.from(signed_msg), {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    }
);

// display the signature in a string format
console.log("\nSignature:\n\n",signature.toString("base64"), '\n');
```
"crypto.sign(algorithm, data, key[, callback])"
<br />

- _Verifying the signature_
```c++
let is_verified = crypto.verify("sha256", Buffer.from(signed_msg), {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    },
    signature
);
```
<br />

* _If signature is verified, proceed with decryption:_
```c++
if (is_verified == true) {

    console.log("signature verified: ", is_verified + '\n');

    // DECRYPT THE DATA
    let yes_no = prompt("Press y to decrypt the message. Press n to abort.\n");
    if (yes_no == 'y') {

    let decrypted_msg = crypto.privateDecrypt(
    {
        key: privateKey,
        // we need to specify the same hash and padding scheme that we used to encrypt the data
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
    },
    encrypted_msg
    );
    // convert data from the Buffer type to a string
    console.log("Your decrypted message is:\n\n", decrypted_msg.toString(), '\n');
    }
    else {
     return;
    }
}
else {
    console.log("Signature was not verified.");
    return;
}
```
# Licence
MIT

# Acknowledgments and Resources
This project was created to learn the basics of cryptography and gain hands-on experience in implementing asymmetric encryption. The following resources were used:
- https://nodejs.org/api/crypto.html crypto standart library documentation
- https://wizardforcel.gitbooks.io/practical-cryptography-for-developers-book/content/
- https://www.sohamkamani.com/nodejs/rsa-encryption/
- https://github.com/rzcoder/node-rsa
- https://ravikantagrawal.medium.com/digital-signature-from-blockchain-context-cedcd563eee5
