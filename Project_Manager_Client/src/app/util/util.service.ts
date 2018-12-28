import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  host:string = "http://localhost:3000";
  constructor() { }
}
