import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase'
import { Location } from '@angular/common'
import { LoadingService } from '../loading.service';
@Component({
  selector: 'app-evolution-add',
  templateUrl: './evolution-add.page.html',
  styleUrls: ['./evolution-add.page.scss'],
})
export class EvolutionAddPage implements OnInit {

  ref: any
  detail: any
  data = {
    date: new Date().getTime(),
    height: 0,
    other: "-",
    weight: 0
  }
  constructor(
    private route: ActivatedRoute,

    private loading: LoadingService,
    private router: Router) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        let state = this.router.getCurrentNavigation().extras.state;
        this.ref = state.ref
        this.detail = state.detail

      }
    });
  }

  ngOnInit() {
  }

  save() {
    this.loading.present()
    firebase.database().ref(this.ref)
      .push(this.data)
      .then(() => {
        this.loading.dismiss()
        setTimeout(() => {
          this.router.navigateByUrl("tabs/evolution")
        }, 500);

      }).catch((err) => {
        this.loading.dismiss()
        alert(err)
      })

  }
}
