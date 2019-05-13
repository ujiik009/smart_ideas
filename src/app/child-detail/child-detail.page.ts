import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import {Location} from "@angular/common"
@Component({
  selector: 'app-child-detail',
  templateUrl: './child-detail.page.html',
  styleUrls: ['./child-detail.page.scss'],
})
export class ChildDetailPage implements OnInit {

  metaChild: any;
  childNumber = 0
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private location:Location
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.metaChild = this.router.getCurrentNavigation().extras.state.detail;
      }
    });
  }


  ngOnInit() {   
    console.log(this.metaChild);
    
  }

  ionViewWillEnter() {

  }

  back(){
      this.location.back()
  }


}