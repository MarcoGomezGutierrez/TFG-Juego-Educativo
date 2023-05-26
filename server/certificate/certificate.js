const fs = require("fs");
const { execSync } = require("child_process");

/**
 * Creación del certificado para que el servidor funcione con https y el navegador confie en el servidor
 */
function generarCertificado() {
  try {
    // Generar la clave privada
    execSync("openssl genpkey -algorithm RSA -out privatekey.pem");

    // Generar la solicitud de firma de certificado (CSR)
    const csrCommand =
      'openssl req -new -key privatekey.pem -out csr.pem -subj "/CN=localhost"';
    execSync(csrCommand);

    // Generar el certificado autofirmado utilizando la clave privada y el CSR
    execSync(
      "openssl x509 -req -in csr.pem -signkey privatekey.pem -out certificate.pem"
    );

    // Eliminar el archivo CSR ya que no es necesario después de generar el certificado
    fs.unlinkSync("csr.pem");

    console.log("Certificado generado correctamente.");
  } catch (error) {
    console.error("Error al generar el certificado:", error);
  }
}

generarCertificado();
