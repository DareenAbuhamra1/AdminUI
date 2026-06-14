import { productOption } from "./productOptions"

export interface productOptionDisplayDto{
    optionGroupId:number,
    productId:number,
    title:string,
    isRequired:boolean,
    minSelection:number,
    maxSelection:number,
    options:productOption[]
}