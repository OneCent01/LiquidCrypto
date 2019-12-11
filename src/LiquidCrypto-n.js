const crypto = require('crypto')

const LiquidCrypto = (options={}) => {

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
		keypair: options.keypair || generateKeys()
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
		let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
		decrypted += decipher.final('hex')
		return 
	}	

	return {
		publicKey: liquidState.keypair.getPublicKey(),
		keypair: liquidState.keypair,
		deriveKey,
		encrypt,
		decrypt
	}
}

module.exports = {LiquidCrypto}