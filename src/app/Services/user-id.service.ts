import { Injectable } from '@angular/core';

@Injectable()
export class UserIdService {

  private id: number;

  constructor() { }

  setUserId(id:number)
  {
    this.id = id;
  }

  getUserId()
  {
    return this.id;
  }

}
