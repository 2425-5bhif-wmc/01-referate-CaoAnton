import { Injectable } from '@angular/core';
import { store } from '../model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }
  get store () {
    return store
  }
}
