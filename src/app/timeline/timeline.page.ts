import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import * as firebase from 'firebase'
import { HelperService } from '../helper.service'
import * as moment from 'moment'

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {

  constructor(private storage: Storage, private router: Router, private helperService: HelperService) { }
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
  post_content = ""
  boards = []

  ngOnInit() {
    firebase.database().ref("board").on("value", (snapshot) => {
      this.boards = this.helperService.snapshotToArray(snapshot.val())

      this.boards = this.boards.map(boards => {
        boards.timestamp = this.displayTime(boards.timestamp)
        return boards
      }).reverse()
    })

  }

  ionViewWillEnter() {
    this.storage.ready().then(async (storage) => {
      let family = await storage.getItem("family")
      if (family == null) {
        this.router.navigate(["tabs/family"])
      } else {
        this.getFirebase()
      }
    })

  }

  getFirebase() {
    // alert("getFirebase")
    this.storage.ready().then(async (storage) => {
      let uid = await storage.getItem("uid")
      var ref = "family/" + uid
      firebase.database().ref(ref).once("value").then((snapshot) => {
        Object.assign(this.family,snapshot.val())
      }).catch((error) => {
        alert(error)
      })
    })

  }

  displayTime(timestamp) {
    return moment(timestamp).format("วัน DD MMM YYYY เวลา HH:mm")
  }

  post() {
    if (this.post_content != "") {
      firebase.database().ref("board")
        .push({
          family_img: this.family.familyPicture,
          family_name: this.family.familyName,
          content: this.post_content,
          timestamp: new Date().getTime()
        }).then(() => {
          this.post_content = ""
        }).catch((error) => {
          alert(error)
        })

    }
  }

}
