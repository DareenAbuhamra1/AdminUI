import { Service } from '@angular/core';
import {inject} from '@angular/core';
import { AuthCrypto } from './auth-crypto';
import { RoleEnum } from '../enums/RoleEnum.enum';

@Service()
export class AuthService {
    private tokenKey = 'jwt';
    private roleKey = 'role';

    private crpto = inject(AuthCrypto)
    constructor(){
        //const storedToken = localStorage.getItem(this.tokenKey);
        //const role = localStorage.getItem(this.roleKey);
    }
    setToken(token:string){
        //localStorage.setItem(this.tokenKey,this.crpto.encrypt(token));
        localStorage.setItem(this.tokenKey,token);
    }
    getToken():string | null{
        //const encryptedToken = localStorage.getItem(this.tokenKey);
        //if(encryptedToken){
            //return this.crpto.decrypt(encryptedToken);
        //}
        //return null;
        return localStorage.getItem(this.tokenKey);
    }
    logout(){}
    setRole(role:string){
        localStorage.setItem(this.roleKey,role);
    }
    getRole():string | null{
        return localStorage.getItem(this.roleKey);
    }
    isLoggedIn():boolean{
        return false;
    }
    refreshToken(){}

}
