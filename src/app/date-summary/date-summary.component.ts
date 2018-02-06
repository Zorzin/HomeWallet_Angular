import { Component, OnInit } from '@angular/core';
import {SummaryService} from "../Services/summary.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserInfoService} from "../Services/user-id.service";

@Component({
  selector: 'app-date-summary',
  templateUrl: './date-summary.component.html',
  styleUrls: ['./date-summary.component.css']
})
export class DateSummaryComponent implements OnInit {

  private currency:string;
  private summary:any;
  private dataLoaded:boolean;
  private startDate :Date;
  private endDate :Date;
  eachShopProductsXLabel= "dailysummary-eachShopProductsXLabel";
  eachShopProductsYLabel= "dailysummary-eachShopProductsYLabel";
  eachShopCostXLabel = "dailysummary-eachShopCostXLabel";
  eachShopCostYLabel = "dailysummary-eachShopCostYLabel";
  eachCategoriesCostXLabel = 'dailysummary-eachCategoriesCostXLabel';
  eachCategoriesCostYLabel = 'dailysummary-eachCategoriesCostYLabel';
  view: any[] = [500, 400];
  scheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private userService:UserInfoService,
              private router:Router,
              private route: ActivatedRoute,
              private summaryService:SummaryService) {
  }

  ngOnInit() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.startDate.setMonth(this.endDate.getMonth()-1);
    this.getUserCurrency();
    this.getStatistics();
  }

  getUserCurrency()
  {
    this.userService.getUserCurrency().then((currency)=>{
      this.currency = JSON.parse(currency);
    });
  }

  getStatistics(){
    this.summaryService.getSummaryByDates(this.startDate.toLocaleDateString(),this.endDate.toLocaleDateString())
      .then((summary)=>{
        console.log(summary)
        this.summary = summary;
        this.dataLoaded = true;
      });
  }

  SetDates() {
    this.getStatistics();
  }
}
