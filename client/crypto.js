const crypto = require('crypto')

const generateKey = () => {
  const key = crypto.randomBytes(32).toString('hex');
  return key;
}

const secretKey = generateKey();
console.log(secretKey); // Imprime una clave secreta aleatoria de 32 bytes en hexadecimal