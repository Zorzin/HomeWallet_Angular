import {ReceiptProductPost} from "./receipt-product-post";

export class ReceiptCyclicalCreate {
  StartDate: string
  EndDate: string;
  Cycle: number;
  ShopId: number;
  Products: ReceiptProductPost[];
}
