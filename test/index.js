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