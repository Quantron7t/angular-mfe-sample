import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedLibService {

  constructor() { }

  getCopyrightMessage(){
    return `Hello World! Copyright Ⓒ ${new Date().getFullYear()}`;
  }
}
