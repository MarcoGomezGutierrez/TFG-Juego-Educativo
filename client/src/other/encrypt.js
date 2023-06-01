import CryptoJS from 'crypto-js';

const encryptionKey = 'clave-secreta';

// Sacar el código hash de la contraseña
function sha256(password) {
    const encryptedPassword = CryptoJS.SHA256(password).toString();
    return encryptedPassword;
}

function encryptDataJson(data) {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
    return encryptedData;
}

function decryptDataJson(encryptedData) {
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, encryptionKey).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
}

export {sha256, encryptDataJson, decryptDataJson};