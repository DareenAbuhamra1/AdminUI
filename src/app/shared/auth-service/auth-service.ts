import { Service } from '@angular/core';

@Service()
export class AuthService {
    private tokenKey = 'jwt';
    private roleKey = 'role';

    constructor(){
        //const storedToken = localStorage.getItem(this.tokenKey);
        //const role = localStorage.getItem(this.roleKey);
    }
    setToken(token:string){
        localStorage.setItem(this.tokenKey,token);
    }
    getToken():string | null{
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
