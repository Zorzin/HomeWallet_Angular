import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ReceiptService} from "../receipt.service";
import {Receipt} from "../receipt";

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  receipts: Receipt[];

  constructor(private receiptService: ReceiptService, private router: Router) { }

  ngOnInit() {
    this.getReceipts();
  }

  getReceipts(): void {
      this.receiptService.getReceiptsByDaysFromNow(5).then(receipts=>this.receipts = receipts);
  }

}
