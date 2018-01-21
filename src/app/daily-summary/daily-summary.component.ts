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

  private currency:string;
  private summary:any;
  private dataLoaded:boolean;
  private date :string;
  eachShopProductsXLabel= "Sklep";
  eachShopProductsYLabel= "ilość produktów";
  eachShopCostXLabel = "Sklep";
  eachShopCostYLabel = "Kwota produktu";
  eachCategoriesCostXLabel = 'Kategorie';
  eachCategoriesCostYLabel = 'Kwota';
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
    this.getUserCurrency();
    this.date = this.route.snapshot.paramMap.get('date');
    this.summaryService.getDailySummaryByDate(this.date)
      .then((summary)=>{
        console.log(summary)
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
