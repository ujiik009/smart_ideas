import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-expert',
  templateUrl: './expert.page.html',
  styleUrls: ['./expert.page.scss'],
})
export class ExpertPage implements OnInit {

  family={
    expert_1:{
      img:""
    },
    expert_2:{
      img:""
    },
    expert_3:{
      img:""
    },
  }
  constructor(private router: Router, private storage: Storage) { }

  ngOnInit() {
    console.log("ngOnInit");

  }

  ionViewWillEnter() {
    this.storage.get("family")
      .then((family) => {
        if(family!=null){
          Object.assign(this.family,family)
        }
      })
      .catch((error) => {
        alert(error)
      })
  }



  showCreateExpert(expertNumber) {
    this.router.navigateByUrl("create-expert/" + expertNumber)
  }

  showExpert(expertData){
    
    if(expertData.nick_name!=undefined){
      let navigationExtras: NavigationExtras = {
        state: {
          detail:expertData 
        }
      };
      this.router.navigate(["expert-detail"], navigationExtras)
    }
    
  }

}
