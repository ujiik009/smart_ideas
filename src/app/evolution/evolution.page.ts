import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.page.html',
  styleUrls: ['./evolution.page.scss'],
})
export class EvolutionPage implements OnInit {


  family = {
    "child_1": {
      "birthday": "",
      "blood_type": "",
      "description": "",
      "full_name": "",
      "gender": "",
      "img": "",
      "nick_name": ""
    },
    "child_2": {
      "birthday": "",
      "blood_type": "",
      "description": "",
      "full_name": "",
      "gender": "",
      "img": "",
      "nick_name": ""
    },
    "familyName": "",
    "familyPicture": ""
  }

  constructor(private storage: Storage, private router: Router, ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.get("family").then((family) => {
      Object.assign(this.family, family)
    })
  }

  showEvolution(child_detail, child_number) {
    if (child_detail.nick_name != "") {
      let navigationExtras: NavigationExtras = {
        state: {
          detail: child_detail,
          number: child_number

        }
      };
      this.router.navigate(["evolution-list"], navigationExtras)
    }
  }

}
