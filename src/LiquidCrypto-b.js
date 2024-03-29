const LiquidCrypto = async (options={}) => {
	const generateKeys = () => crypto.subtle.generateKey(
	    {
	        name: "ECDH",
	        namedCurve: "P-256", 
	    },
	    true, 
	    ["deriveKey"] 
	)

	const liquidState = {
		keypair: options.keypair || await generateKeys()
	}

	const deriveKey = (publicKey) => crypto.subtle.deriveKey(
	    {
	        name: "ECDH",
	        namedCurve: "P-256",
	        public: publicKey, 
	    },
	    liquidState.keypair.privateKey,
	    { 
	        name: "AES-GCM", 
	        length: 256, 
	    },
	    false, 
	    ["encrypt", "decrypt"] 
	)

	const encrypt = async (data, key) => {
		const iv = crypto.getRandomValues(new Uint8Array(12))
		const dataBuffer = new TextEncoder().encode(data).buffer
		const encrypted = await crypto.subtle.encrypt(
			{
				name: 'AES-GCM',
				iv
			},
			key,
			dataBuffer
		)

		const ivEncryptedBlob = new Blob([iv, encrypted])
		const ivEncryptedBuffer = await (await new Response(ivEncryptedBlob)).arrayBuffer()
		return ivEncryptedBuffer
	}

	const decrypt = async (data, key) => {
		const iv = data.slice(0, 12)
		const encData = data.slice(12)
		return new TextDecoder().decode(await crypto.subtle.decrypt(
			{
				name: "AES-GCM",
				iv
			},
			key,
			encData
		))
	}

	return {
		publicKey: liquidState.keypair.publicKey,
		kaypair: liquidState.keypair,
		deriveKey,
		encrypt,
		decrypt
	}
}

window.LiquidCrypto = LiquidCrypto