import { RoleEnum } from "../enums/RoleEnum.enum";

export interface verifyOtpDto{
    phone:string,
    otpCode:string,
    role:number,
}