import {ReceiptProductEdit} from "./receipt-product-edit";

export class ReceiptEdit {
  ReceiptId: number;
  Date: string;
  ShopId: number;
  Products: ReceiptProductEdit[];
}
