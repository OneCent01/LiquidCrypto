# LiquidCrypto

LiquidCrypto is an opinionated isomorphic server/browser object factory for secure asymmetric cryptography interfaces. It is composed of two implementations of the same interface, utilizing the native cryotography modules available in their respective contexts; WebCrypto API for the browser, crypto module for NodeJS. 

Instantiations of the LiquidCrypto factory are referred to as liquidKeypair objects. On creation, the liquidKeypair either sets its internal keypair reference to the given keypair if there was one, otherwise it generates a pair using the elliptic curve diffie-hellman (ECDH) alrogithm on the NIST P-256 curve (implementation of support for additional curves is in development). The instance has three public methods (deriveKey, encrypt, decrypt) and two properties (keypair, publicKey). 


** Motivation **

While developing a full stack zero-knowledge (ZK) application, I needed to create secure channels of communication via ephemeral key generation for data exposed to the network. After implementing it in NodeJS and in-browser JavaScript, I realized how annoying it is to have to learn how to implement the same thing in two different environments. As engineers and developers, our interest is usually focused on building new system, not grokking two complex and cryptography modules to perform identical operations. This library takes care of some of that for you, offering a simple interface for utilizing asymmetric keypair encryption. An understanding of the underlying crypto systems is not required to use this library, but it's encouraged to have a strong understanding of crytography in general and secure implementation of password-accessible key exchange (PAKE) systems in specific. 

## Installation

Use the package manager npm to install LiquidCrypto.

```bash
npm install LiquidCrypto
```

## Usage

### In-browser JavaScript

```javascript
<head>
    <!-- Attach the module to the global namespace with a script tag -->
    <script type="text/javascript" src="./node_modules/liquidcrypto/dist/LiquidCrypto-b.js"></script>
    <script type="text/javascript">
        const init = async () => {
            // generating a new keypair: 
            const liquidKeypair = await LiquidCrypto()/*<-- SENDER*/
            const liquidKeypair2 = await LiquidCrypto()/*<-- RECEIVER*/

            // derive symmetric encryption key
            const secretKey = await liquidKeypair.deriveKey(liquidKeypair2.publicKey)

            const encodedSecret = await liquidKeypair.encrypt('secret data', secretKey)

            const secretKey2 = await liquidKeypair.deriveKey(liquidKeypair2.publicKey)

            const decodedSecret = await liquidKeypair.decrypt(encodedSecret, secretKey2)

            console.log('decrypted secret: ', decodedSecret)
        }
        init()
    </script>
</head>
```

### NodeJS

```javascript
const { LiquidCrypto } = require('LiquidCrypto')

const init = async () => {

    // generating a new keypair: 
    const liquidKeypair = LiquidCrypto()/*<-- SENDER*/
    const liquidKeypair2 = LiquidCrypto()/*<-- RECEIVER*/

    // derive symmetric encryption key
    const secretKey = await liquidKeypair.deriveKey(liquidKeypair2.publicKey)

    const encodedSecret = liquidKeypair.encrypt('secret data', secretKey)

    const secretKey2 = await liquidKeypair.deriveKey(liquidKeypair2.publicKey)

    const decodedSecret = liquidKeypair.decrypt(encodedSecret, secretKey2)

    console.log('decrypted secret: ', decodedSecret)
}

init()
```

## Available methods

#### LiquidCrypto([options])
* @args
    * options(optional): object containing initlization settings
        * available options: keypair

Core method for instantiating liquidKeypair objects. Returns a reference to the liquidKeypair object. 

```javascript
// generating a new keypair: 
const liquidKeypair = LiquidCrypto()

// creaing a new liquidKeypair object with a seeded keypair: 
const liquidKeypairCopy = LiquidCrypto(liquidKeypair.keypair)
```

## LiquidCrypto instance methods

#### keypair

Static keypair, either a CryptoKey object (browser) or ECDH class (NodeJS) instance.

#### publicKey: 

Static publicKey ArrayBuffer.

#### deriveKey(publicKey)
* @args
    * publicKey[ARRAYBUFFER]: public key from receiver's keypair

Accepts a public key as an array buffer and returns a symmetric key for encryption. 


```javascript
// generating a new keypair: 
const liquidKeypair = LiquidCrypto()/*<-- SENDER*/
const liquidKeypair2 = LiquidCrypto()/*<-- RECEIVER*/

// derive symmetric encryption key
const secretKey = await liquidKeypair.deriveKey(liquidKeypair2.publicKey)
```

#### encrypt(data, key)
* @args
    * data[STRING]: data to encrypt
    * key[ARRAYBUFFER]: symmetric key to encrypt data with, should be derived from deriveKey()

Accepts a string of data and a symmetric key as an ArrayBuffer. Returns a string of encrypted data. 

```javascript
// generating a new keypair: 
const liquidKeypair = LiquidCrypto()/*<-- SENDER*/
const liquidKeypair2 = LiquidCrypto()/*<-- RECEIVER*/

// derive symmetric encryption key
const secretKey = await liquidKeypair.deriveKey(liquidKeypair2.publicKey)

const encodedSecret = liquidKeypair.encrypt('secret data', secretKey)

console.log('encrypted secret: ', encodedSecret)
```

#### decrypt(data, key)

Accepts a string of encrypted data and a symmetric key as an ArrayBuffer. Returns a string of decrypted data. 

```javascript
// generating a new keypair: 
const liquidKeypair = LiquidCrypto()/*<-- SENDER*/
const liquidKeypair2 = LiquidCrypto()/*<-- RECEIVER*/

// derive symmetric encryption key
const secretKey = await liquidKeypair.deriveKey(liquidKeypair2.publicKey)

const encodedSecret = liquidKeypair.encrypt('secret data', secretKey)

const secretKey2 = await liquidKeypair.deriveKey(liquidKeypair2.publicKey)

const decodedSecret = liquidKeypair.decrypt(encodedSecret, secretKey2)

console.log('decrypted secret: ', decodedSecret)
```

## Thank you! 

Feel free to contact me with any questions or comments at jmpenney22@gmail.com. 

Pull requests are encouraged! 

## Changelog

* v1.1.5: 
    * OPTIONS: constructor accepts an options object argument on instantiation enabling customizing initlization settings. Currently only used for seeding the keypair, but I plan on allowing additional customizability (Notably, for selecting the curve to use in the ECDH algorithm).
    * PUBLIC KEYPAIR: expose the keypair object through the keypair property on liquidKeypairs. 