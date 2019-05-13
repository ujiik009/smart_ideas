import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase"
import { LoadingService } from '../loading.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.page.html',
  styleUrls: ['./sing-up.page.scss'],
})
export class SingUpPage implements OnInit {
  data= {
    email: "",
    password: "",
    confirm: "",
  }
  constructor(private loading: LoadingService,private router: Router ) { }

  ngOnInit() {
  }

  singup() {
    this.loading.present()
    if (this.data.email != "" && this.data.password != "") {

      if (this.data.password == this.data.confirm) {
        firebase.auth().createUserWithEmailAndPassword(this.data.email, this.data.password)
          .then(() => {
            
            this.loading.dismiss()
            setTimeout(() => {
              this.router.navigate([""])
            }, 500);
          })
          .catch((error) => {
            alert(error)
            this.loading.dismiss()
          })
      } else {
        this.loading.dismiss()
        alert("รหัสผ่านไม่ตรงกัน")
      }

    } else {
      this.loading.dismiss()
      alert("กรุณาใส่ข้อมูลให้เรียบร้อย")
    }
  }

}
