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
<img width="1095" alt="generate" src="https://user-images.githubusercontent.com/32555704/131212007-589a4989-d34d-4dd3-a755-fd15e0788cbc.png">
"crypto.generateKeyPairSync(type, options)" takes two arguments:<br />
   1. key type (rsa in this case) <br />
   2. key size in bits <br />
<br />

* _Next, we prompt user for data and proceed with encryption:_
<img width="718" alt="encrypt" src="https://user-images.githubusercontent.com/32555704/131212197-a0ad7c61-36f7-4ed7-9fff-44a1b7457e7b.png">
"crypto.publicEncrypt(key, buffer)" method uses: <br />
  1. a PEM encoded key, <br />
  2. Optimal Asymmetric Encryption Padding (OAEP) scheme, <br />
  3. SHA256 hashing algorithm, <br />
  4. Buffer to convert data from string to buffer format. <br />
<br />

+ _Signing_
<img width="665" alt="sign" src="https://user-images.githubusercontent.com/32555704/131212687-f1798a05-0275-4bcc-8552-0fe33d32db4b.png">
"crypto.sign(algorithm, data, key[, callback])"
<br />

- _Verifying the signature_
<img width="593" alt="verify" src="https://user-images.githubusercontent.com/32555704/131212738-4a07bea9-74ab-443d-a393-6f47371ad4b4.png">
<br />

* _If signature is verified, proceed with decryption:_
<img width="813" alt="decryption" src="https://user-images.githubusercontent.com/32555704/131212777-85db5eb9-6e78-43bc-8e53-e168bb851e6c.png">

# Licence
MIT

# Acknowledgements and Resources
This project was created to learn the basics of cryptography and gain hands-on experience in implementing asymmetric encryption. The following resources were used:
- https://nodejs.org/api/crypto.html crypto standart library documentation
- https://wizardforcel.gitbooks.io/practical-cryptography-for-developers-book/content/
- https://www.sohamkamani.com/nodejs/rsa-encryption/
- https://github.com/rzcoder/node-rsa
- https://ravikantagrawal.medium.com/digital-signature-from-blockchain-context-cedcd563eee5
