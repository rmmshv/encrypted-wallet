

const crypto = require("crypto"); // crypto standard library for key generation

// generate public/private key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {modulusLength: 2048, }); // 2048 is the standard secure default length for RSA keys


// ask user for a message to encrypt
let prompt = require("prompt-sync")();
let inputData = prompt("Please type the message you wish to encrypt and press enter: ");


// ENCRYPT THE DATA
let encryptedMsg = crypto.publicEncrypt(
    {
        key: publicKey, // key used to encrypt the data (generated in the previous step)
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, // OAEP padding scheme
        oaepHash: "sha256", // SHA256 hashing algorithm
    },
    Buffer.from(inputData) // convert data string to a buffer using 'Buffer.from'
);

// display the output
console.log('\nYour encrypted message is:\n\n', encryptedMsg.toString("base64"), '\n');


// SIGN
let signedMsg = inputData; // data to sign

let signature = crypto.sign("sha256", Buffer.from(signedMsg), {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    }
);

console.log("\nSignature:\n\n",signature.toString("base64"), '\n');

let isVerified = crypto.verify("sha256", Buffer.from(signedMsg), {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    },
    signature
);

// if signature is verified, proceed with decryption or abort
if (isVerified == true) {

    console.log("signature verified: ", isVerified + '\n');

    // DECRYPT THE DATA

    let yesNo = prompt("Press y to decrypt the message. Press n to abort.\n");
    if (yesNo == 'y') {

    let decryptedMsg = crypto.privateDecrypt(
    {
        key: privateKey,
        // we need to specify the same hash and padding scheme that we used to encrypt the data
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
    },
    encryptedMsg
    );
    // convert data from the Buffer type to a string
    console.log("Your decrypted message is:\n\n", decryptedMsg.toString(), '\n');
    }
    else {
     return;
    }
}
else {
    console.log("Signature was not verified.");
    return;
}