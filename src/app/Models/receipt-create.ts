import {ReceiptProduct} from "./receipt-product";
import {ReceiptProductPost} from "./receipt-product-post";

export class ReceiptCreate {
  Date: string;
  ShopId: number;
  Products: ReceiptProductPost[];
}
