const fs = require("fs");
const path = require("path");

function listFiles(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      console.log(`Directory: ${filePath}`);
      listFiles(filePath); // Recursivamente listar archivos en subdirectorios
    } else {
      console.log(`File: ${filePath}`);
    }
  });
}

const targetDirectory = "../client/src/image/preguntas"; // Reemplaza con la ruta de tu carpeta
listFiles(targetDirectory);
