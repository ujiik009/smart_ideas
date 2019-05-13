import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class SyncFirebaseStorageService {

  constructor(private storage:Storage) { }

   sync(uid){
   return firebase.database().ref("family/"+uid).once("value").then((snapshot)=>{
      this.storage.set("family",snapshot.val())
    })
  }
}
