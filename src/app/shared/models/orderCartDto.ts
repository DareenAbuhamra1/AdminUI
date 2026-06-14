import { OrderLineCart } from "./orderLineCart";
import { OrderStatusEnum } from "../enums/OrderStatusEnum";

export interface OrderCartDto {
  orderId: number;
  deliveryLocationId: number;
  status: OrderStatusEnum;
  customerId: number;
  partnerId: number;
  domainId: number;
  orderLine: OrderLineCart;
}

