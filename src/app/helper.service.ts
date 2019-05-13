import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }


  snapshotToArray = snapshot => {
    let returnArr = [];
    try {
      Object.keys(snapshot).forEach(key => {

        snapshot[key].id = key
  
        returnArr.push(snapshot[key])
      })
  
      
    } catch (error) {
      returnArr = [];
    }
    
    return returnArr
  };
}
