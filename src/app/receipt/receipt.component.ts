import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ReceiptService} from "../receipt.service";
import {Receipt} from "../Models/receipt";

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  receiptsStrings: any;
  receipts: Receipt[];

  constructor(private receiptService: ReceiptService, private router: Router) { }

  ngOnInit() {
    this.getReceipts();
  }

  getReceipts(): void {
      this.receiptService.getReceipts().then(receipts=>this.receipts = receipts);
  }

}
