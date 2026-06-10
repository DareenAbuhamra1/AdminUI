import { Service } from '@angular/core';
import * as CryptoJS from 'crypto-js';

const SECRET_KEY = "my_secret_not_secret_key";
@Service()
export class AuthCrypto {
    
    encrypt(token : string): string{
        return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
    }

    decrypt(encrypted : string): string | null {
        const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}
