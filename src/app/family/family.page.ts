import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { SyncFirebaseStorageService } from '../sync-firebase-storage.service'
import * as firebase from 'firebase'
import { LoadingService } from '../loading.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-family',
  templateUrl: './family.page.html',
  styleUrls: ['./family.page.scss'],
})
export class FamilyPage implements OnInit {

  constructor(
    public loading: LoadingService,
    private router: Router,
    private storage: Storage,
    public modalController: ModalController) { }

  family = {
    "child_1" : {
      "birthday" : "",
      "blood_type" : "",
      "description" : "",
      "full_name" : "",
      "gender" : "",
      "img" : "",
      "nick_name" : ""
    },
    "child_2" : {
      "birthday" : "",
      "blood_type" : "",
      "description" : "",
      "full_name" : "",
      "gender" : "",
      "img" : "",
      "nick_name" : ""
    },
    "familyName" : "",
    "familyPicture" : ""
  }
  uid: string
  ngOnInit() {
    // this.uid = firebase.auth().currentUser.uid
  }

  async ionViewWillEnter() {
    //   this.syncFirebaseStorageService.sync(this.uid).then(()=>{})
    this.loading.present().then(() => {
      this.getFirebase()
    })

  }


  createFamily() {
    this.router.navigate(["create-family"])
  }

  createChild(childNumber) {
    this.router.navigate(["create-child/" + childNumber])
  }


  getFirebase() {
    // alert("getFirebase")
      this.storage.ready().then(async (storage) => {
        let familyStorage = await storage.getItem("family")
        Object.assign(this.family,familyStorage)
        this.loading.dismiss()
      })
  }

  genPath(path) {
    if (path != "") {
      return path
      // return path + "&time=" + new Date().getTime()
    } else {
      return path
    }
  }

  showDetailChild(child_data) {
    let navigationExtras: NavigationExtras = {
      state: {
        detail: child_data
      }
    };

    if (child_data != undefined) {
      this.router.navigate(["child-detail"], navigationExtras)
    } else {
      alert("กรุนาสร้างบัญชีลูก ก่อนนะค่ะ")
    }
  }

  showfamily(family){
    if(family!=undefined){
      let navigationExtras: NavigationExtras = {
        state: {
          detail: family
        }
      };

      this.router.navigate(["family-detail"], navigationExtras)
    }else{
      alert("กรุณาสร้างครอบครัวก่อนนะคะ")
    }
  }

  
}
