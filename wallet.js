const crypto = require("crypto"); // crypto standard library 

// generate public/private key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {modulusLength: 2048, }); // 2048 is the standard secure default length for RSA keys


// ask user for a message to encrypt
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


// SIGN
let signed_msg = input_data; // data to sign

// generate a signature
let signature = crypto.sign("sha256", Buffer.from(signed_msg), {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    }
);

// display the signature in a string format
console.log("\nSignature:\n\n",signature.toString("base64"), '\n');

let is_verified = crypto.verify("sha256", Buffer.from(signed_msg), {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    },
    signature
);

// if signature is verified, proceed with decryption or abort
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
