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

  public currency:string;
  public summary:any;
  public dataLoaded:boolean;
  public startDate :Date;
  public endDate :Date;
  public eachShopProductsXLabel= "dailysummary-eachShopProductsXLabel";
  public eachShopProductsYLabel= "dailysummary-eachShopProductsYLabel";
  public eachShopCostXLabel = "dailysummary-eachShopCostXLabel";
  public eachShopCostYLabel = "dailysummary-eachShopCostYLabel";
  public eachCategoriesCostXLabel = 'dailysummary-eachCategoriesCostXLabel';
  public eachCategoriesCostYLabel = 'dailysummary-eachCategoriesCostYLabel';
  public view: any[] = [500, 400];
  public scheme = {
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
    let startoffset = this.startDate.getTimezoneOffset()*60000;
    let startdate = new Date(this.startDate);
    startdate.setTime(startdate.getTime()-startoffset);

    let endoffset = this.endDate.getTimezoneOffset()*60000;
    let enddate = new Date(this.endDate);
    enddate.setTime(enddate.getTime()-endoffset);

    this.summaryService.getSummaryByDates(startdate.toISOString(),enddate.toISOString())
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
