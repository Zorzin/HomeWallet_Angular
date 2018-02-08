import { Component, OnInit } from '@angular/core';
import {UserInfoService} from "../Services/user-id.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {SummaryService} from "../Services/summary.service";

@Component({
  selector: 'app-daily-summary',
  templateUrl: './daily-summary.component.html',
  styleUrls: ['./daily-summary.component.css']
})


export class DailySummaryComponent implements OnInit {

  public currency:string;
  public summary:any;
  public dataLoaded:boolean;
  public date :string;
  public dateView :string;
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
    this.getUserCurrency();
    this.date = this.route.snapshot.paramMap.get('date');
    this.summaryService.getDailySummaryByDate(this.date)
      .then((summary)=>{
        console.log(summary)
        this.dateView = new Date(this.date).toLocaleDateString();
        this.summary = summary;
        this.dataLoaded = true;
      })
  }

  getUserCurrency()
  {
    this.userService.getUserCurrency().then((currency)=>{
      this.currency = JSON.parse(currency);
    });
  }

}
