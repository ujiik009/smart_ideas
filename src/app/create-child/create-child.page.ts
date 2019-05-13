import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { LoadingService } from '../loading.service';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import * as firebase from 'firebase'
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-create-child',
  templateUrl: './create-child.page.html',
  styleUrls: ['./create-child.page.scss'],
})
export class CreateChildPage implements OnInit {
  childNumber: any;
  gender = true;
  genderString = "ชาย"
  img = "/assets/img/family-img-create.png"

  metaChild = {
    nick_name: "",
    full_name: "",
    blood_type: "",
    birthday: "",
    description: "",
    gender: "",
    img: ""
  }
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public loading: LoadingService,
    private imagePicker: ImagePicker,
    private router: Router,
    private storage: Storage
  ) { }


  ngOnInit() {
    this.childNumber = this.route.snapshot.paramMap.get('number');
  }
  back() {
    this.location.back()
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

  displayGender() {
    if (this.gender) {
      this.metaChild.gender = "ชาย"
    } else {
      this.metaChild.gender = "หญิง"
    }

  }

  saveChild() {


    if (this.metaChild.nick_name != "") {
      let uid = firebase.auth().currentUser.uid
      this.loading.present()
      firebase.storage()
        .ref("family/" + uid + "/child_" + this.childNumber + ".jpg")
        .putString(this.img, "data_url")
        .then(async (snapshot) => {
          let urlDownload = await snapshot.ref.getDownloadURL()
          var ref = firebase.database().ref("family/" + uid + "/child_" + this.childNumber)

          this.metaChild.img = urlDownload
          ref.set(this.metaChild)
            .then(async () => {

              this.storage.get("family").then((family) => {
                if (family != "") {
                  Object.assign(family, {
                    ["child_" + this.childNumber]: this.metaChild
                  })

                  this.storage.set("family", family).then(() => {
                    this.loading.dismiss()
                    this.router.navigate(["tabs/family"])
                  }).catch((err) =>{
                    this.loading.dismiss()
                    alert(err)
                  })
                }
              })


            })
            .catch((error) => {
              this.loading.dismiss()
              alert(error)
            })
        })
        .catch((error) => {
          alert(error)
        })
    }

  }

}
