const LiquidCrypto = require('LiquidCrypto').LiquidCrypto

// EXAMPLE USAGE: COMMUNICATION BETWEEN SERVERS
const init = async () => {

	// instantiate keypairs
	const liquidCrypto = LiquidCrypto(/*SEED KEYPAIR*/)
	const liquidCrypto2 = LiquidCrypto()

	// derive symmetric encryption key
	const secretKey2 = await liquidCrypto2.deriveKey(liquidCrypto.publicKey)

	const secret = 'secret data'

	console.log('secret: ', secret)

	const encodedSecret = liquidCrypto2.encrypt(secret, secretKey2)

	console.log('encrypted secret: ', encodedSecret)

	const secretKey = await liquidCrypto.deriveKey(liquidCrypto2.publicKey)

	const decodedSecret = liquidCrypto.decrypt(encodedSecret, secretKey)

	console.log('decodedSecret: ', decodedSecret)
}

init()