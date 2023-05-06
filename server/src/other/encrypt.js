const crypto = require('crypto');
// Creamos un objeto hash utilizando el algoritmo SHA-256
const hash = crypto.createHash('sha256');

function encrypt(password) {
    // Actualizamos el objeto hash con la cadena a encriptar
    hash.update(password);

    // Generamos el hash criptográfico en formato hexadecimal
    const encryptedPassword = hash.digest('hex');

    //Exportamos el hash encriptado
    return encryptedPassword;
}

module.exports = { encrypt };

