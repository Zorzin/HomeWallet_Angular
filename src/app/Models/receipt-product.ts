export class ReceiptProduct {
  ID: number;
  Name: string;
  Amount : number;
  Price: number;
  TotalValue: number;

  constructor(ID: number, Name: string, Amount:number,Price:number,TotalValue:number)
  {
    this.ID = ID;
    this.Name = Name;
    this.Amount = Amount;
    this.Price = Price;
    this.TotalValue = TotalValue;
  }

}
