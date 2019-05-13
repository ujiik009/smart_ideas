import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-family-detail',
  templateUrl: './family-detail.page.html',
  styleUrls: ['./family-detail.page.scss'],
})
export class FamilyDetailPage implements OnInit {
  family: any
  
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
    ) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.family = this.router.getCurrentNavigation().extras.state.detail;
      }
    });

  }

  ngOnInit() {
    
    console.log(this.family);
    
  }

  back() {
    this.location.back()
  }

}
