import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
@Component({
  selector: 'app-expert-detail',
  templateUrl: './expert-detail.page.html',
  styleUrls: ['./expert-detail.page.scss'],
})
export class ExpertDetailPage implements OnInit {
  metaExpert:any
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location :Location
  ) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.metaExpert = this.router.getCurrentNavigation().extras.state.detail;
      }
    });
  }

  ngOnInit() {
    console.log(this.metaExpert);
  }

  back(){
    this.location.back()
  }
  

}
