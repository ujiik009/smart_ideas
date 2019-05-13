import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { LoadingService } from '../loading.service';
import * as firebase from 'firebase'
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-create-expert',
  templateUrl: './create-expert.page.html',
  styleUrls: ['./create-expert.page.scss'],
})
export class CreateExpertPage implements OnInit {

  expertNumber: any
  img = "/assets/img/exp.png"


  metaExpert = {
    nick_name: "-",
    fullname: "-",
    address: "-",
    phone: "-",
    email: "-",
    line_id: "-",
    education: "-",
    training: "-",
    career_history: "-",
    academic_performance: "-",
    img: ""
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private imagePicker: ImagePicker,
    private loading: LoadingService,
    private storage: Storage
  ) {
  }

  ngOnInit() {
    this.expertNumber = this.route.snapshot.paramMap.get('number');
  }
  async selectImg() {
    let options: ImagePickerOptions = {
      //here Quality of images, defaults to 100  
      quality: 100,
      //here Width of an Image  
      width: 600,
      //here Height of an Image  
      height: 600,
      /** Output type, defaults to 0 (FILE_URI). 

      * FILE_URI :0 (number) it returns a actual path for an image 

      */
      //DATA_URI: 1(number) it returns a base64 data  
      //for an image  
      outputType: 1
      //here Maximum image count for selection, defaults to 15.  
      //maximumImagesCount: 15(1 - 15) numbers  
      //while setting a number 15 we can load 15 images in one selection.  
    };
    this.imagePicker.getPictures(options).then((results) => {

      if (results.length > 0) {
        // it mean have image
        let base64 = 'data:image/jpeg;base64,' + results[0]
        this.img = base64
      }
    }, (err) => { alert('Image URI: Error ' + err) });
  }

  back() {
    this.location.back()
  }

  saveExpert() {
    
    if (this.metaExpert.nick_name != "") {
      let uid = firebase.auth().currentUser.uid
      this.loading.present()
      firebase.storage()
        .ref("family/" + uid + "/expert_" + this.expertNumber + ".jpg")
        .putString(this.img, "data_url")
        .then(async (snapshot) => {
          let urlDownload = await snapshot.ref.getDownloadURL()
          var ref = firebase.database().ref("family/" + uid + "/expert_" + this.expertNumber)
          this.metaExpert.img = urlDownload
          ref.set(this.metaExpert)
            .then(async () => {
              this.storage.get("family").then((family) => {
                if (family != "") {
                  Object.assign(family, {
                    ["expert_" + this.expertNumber]: this.metaExpert
                  })
                  this.storage.set("family", family).then(() => {
                    this.loading.dismiss()
                    this.router.navigate(["tabs/expert"])
                  }).catch((err) => {
                    this.loading.dismiss()
                    alert(err)
                  })
                }
              })
            })
            .catch((err) => {
              this.loading.dismiss()
              alert(err)
            })
        })
    }
  }

}
