import {ReceiptProductPost} from "./receipt-product-post";

export class ReceiptCreate {
  Date: string;
  ShopId: number;
  Products: ReceiptProductPost[];
}
