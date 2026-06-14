import { OrderLineOptionsCart } from "./orderLineOptionsCart";

export interface OrderLineCart {
  productId: number;
  quantity: number;
  note: string;
  orderLineOptions?: OrderLineOptionsCart[];
}
