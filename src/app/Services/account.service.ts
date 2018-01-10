import { Injectable } from '@angular/core';
import {SelectItem} from "primeng/primeng";

@Injectable()
export class AccountService {


  themes: SelectItem[];
  languages: SelectItem[];
  constructor() { }

  getLanguages(){
    if(!this.languages)
    {
      this.initLanguages();
    }
    return this.languages;
  }

  getThemes(){
    if(!this.themes)
    {
      this.initThemes();
    }
    return this.themes;
  }

  initThemes(){
    this.themes = [
      {label:'Light',value:'light'},
      {label:'Dark',value:'dark'}
    ];
  }

  initLanguages(){
    this.languages = [
      {label:'Polish',value:'pl'},
      {label:'English',value:'en'}
    ];
  }

}
