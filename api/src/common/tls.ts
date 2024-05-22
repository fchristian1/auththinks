import fs from "fs";
import path from "path";
import {execSync} from 'child_process';
const filePEM = "./key.pem";
const fileCert = "./cert.pem";

const checkTLS = () =>{
    if (checkFileExists(filePEM) && checkFileExists(fileCert)) {
        return;
    }
    generateKeyAndCert(filePEM, fileCert);
    console.log("TLS files created");
}

export default checkTLS;

function generateKeyAndCert(filePEM:string, fileCert:string): void {
    const keyPath = path.join("./", filePEM);
    const certPath = path.join("./", fileCert);

    // Generiert den privaten Schlüssel
    execSync(`openssl genrsa -out ${keyPath} 2048`);

    // Generiert das Zertifikat
    execSync(`openssl req -new -x509 -key ${keyPath} -out ${certPath} -days 365 -subj "/CN=localhost"`);

    console.log('Key gespeichert in:', keyPath);
    console.log('Zertifikat gespeichert in:', certPath);
  }

const checkFileExists = (path:string):boolean => {
  return fs.existsSync(path);
}
