import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import * as firebase from 'firebase'
import { HelperService } from '../helper.service'
import * as moment from 'moment'
@Component({
  selector: 'app-evolution-list',
  templateUrl: './evolution-list.page.html',
  styleUrls: ['./evolution-list.page.scss'],
})
export class EvolutionListPage implements OnInit {
  childNumber: any
  chileDetail: any
  evolutions=[]
  uid :any
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private helperService: HelperService
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        let state = this.router.getCurrentNavigation().extras.state;
        this.childNumber = state.number
        this.chileDetail = state.detail
      }
    });

    this.uid = firebase.auth().currentUser.uid


  }

  ngOnInit() {
  }

  back() {
    this.location.back()
  }
  addEvolution() {
    let ref = `family/${this.uid}/child_${this.childNumber}/evolutions`
    
    let navigationExtras: NavigationExtras = {
      state: {
        ref: ref,
        detail:this.chileDetail
      }
    };
    this.router.navigate(["evolution-add"],navigationExtras)
  }

  ionViewWillEnter() {
    
    firebase.database().ref(`family/${this.uid}/child_${this.childNumber}/evolutions`)
    .once("value")
    .then((snapshot)=>{
      this.evolutions = this.helperService.snapshotToArray(snapshot.val()).reverse()
    })
  }

  displayTime(timestamp) {
    return moment(timestamp).format("วัน DD MMM YYYY เวลา HH:mm")
  }
}
