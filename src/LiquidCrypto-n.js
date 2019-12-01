const crypto = require('crypto')

const LiquidCrypto = (keypair) => {

	// private method for creating an asymmetric keypair object,
	// generating its keys, and returning a reference to the object
	const generateKeys = () => {
		const ecdh = crypto.createECDH('prime256v1')
		ecdh.generateKeys()
		return ecdh
	}

	// state used to track internal variables
	const liquidState = {
		// keypair associated with this crypto wrapper
		keypair: keypair || generateKeys()
	}

	// outputs a 32 byte (256 bits) buffer object
	const deriveKey = (publicKey) => (
		liquidState.keypair !== null 
			? liquidState.keypair.computeSecret(publicKey) 
			: 'ERROR: keys not yet generated'
	)

	const ivLength = 12
	const encrypt = (data, key) => {
		// using a base64 IV, which is 6 bytes per character
		const iv = crypto.randomBytes(ivLength * 6).toString('base64').slice(0, ivLength)

		const cipher = crypto.createCipheriv(
			'aes-256-gcm',
			key,
			iv
		)

		return `${iv.toString('hex')}${cipher.update(data).toString('hex')}${cipher.final().toString('hex')}`
	}

	const decrypt = (data, key) => {
		const iv = data.slice(0, ivLength)
		const encryptedData = data.slice(ivLength)

		const decipher = crypto.createDecipheriv(
			'aes-256-gcm',
			key,
			iv
		)

		return decipher.update(encryptedData, 'hex', 'utf8')
	}	

	return {
		publicKey: liquidState.keypair.getPublicKey(),
		deriveKey,
		encrypt,
		decrypt
	}
}

module.exports = LiquidCrypto


// EXAMPLE USAGE: COMMUNICATION BETWEEN SERVERS
// const init = async () => {

// 	// instantiate keypairs
// 	const liquidCrypto = LiquidCrypto(/*SEED KEYPAIR*/)
// 	const liquidCrypto2 = LiquidCrypto()

// 	// derive symmetric encryption key
// 	const secretKey2 = await liquidCrypto2.deriveKey(liquidCrypto.publicKey)

// 	const secret = 'secret data'

// 	console.log('secret: ', secret)

// 	const encodedSecret = liquidCrypto2.encrypt(secret, secretKey2)

// 	console.log('encrypted secret: ', encodedSecret)

// 	const secretKey = await liquidCrypto.deriveKey(liquidCrypto2.publicKey)

// 	const decodedSecret = liquidCrypto.decrypt(encodedSecret, secretKey)

// 	console.log('decodedSecret: ', decodedSecret)
// }

// init()

