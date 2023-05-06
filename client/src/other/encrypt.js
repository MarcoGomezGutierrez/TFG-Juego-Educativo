import CryptoJS from 'crypto-js';

// Sacar el codigo hash de la contraseña
export function sha256(password) {
    const encryptedPassword = CryptoJS.SHA256(password).toString();
    return encryptedPassword;
}