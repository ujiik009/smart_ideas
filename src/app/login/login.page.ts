import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase'
import { LoadingService } from '../loading.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = ""
  password: string = ""
  constructor(private router: Router, private storage: Storage, private loading: LoadingService) { }

  ngOnInit() {
  }

  login() {
    if (this.email != "" && this.password != "") {
      this.loading.present()
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(async (firebaseRes) => {

          // get metaFamily
          firebase.database().ref("family/"+firebaseRes.user.uid)
            .once("value").then((snapshot) => {
              var family = snapshot.val()

              if (family != null) {
                
                this.storage.set("family", family)
                  .then(() => {
                    this.storage.set("uid", firebaseRes.user.uid).then(() => {
                      this.loading.dismiss()
                      setTimeout(() => {
                        this.router.navigate(["tabs"])
                      }, 500);
                    })
                  })
              } else {
                this.storage.remove("family")
                this.storage.set("uid", firebaseRes.user.uid).then(() => {
                  this.loading.dismiss()
                  setTimeout(() => {
                    this.router.navigate(["tabs"])
                  }, 500);
                })
              }
            })


        })
        .catch((error) => {
          this.loading.dismiss()
          alert(error)
        })
    } else {
      alert("Please enter the Email and password.")
    }


    // this.router.navigate(["tabs"])
  }

  singUp(){
    this.router.navigateByUrl("sing-up")
  }

}
