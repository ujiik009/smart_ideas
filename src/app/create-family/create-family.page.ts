import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import * as firebase from 'firebase'
import { LoadingService } from '../loading.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-create-family',
  templateUrl: './create-family.page.html',
  styleUrls: ['./create-family.page.scss'],
})
export class CreateFamilyPage implements OnInit {

  

  constructor(
    private location: Location,
    private imagePicker: ImagePicker,
    public loading: LoadingService,
    private router: Router,
    private storage:Storage
  ) { }

  img = "/assets/img/family-img-create.png"
  familyName = ""
  ngOnInit() {
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

  ionViewWillEnter() {

  }
  saveFamily() {
    var pathArray = this.img.split("/")


    if (pathArray[pathArray.length - 1] != "family-img-create.png") {
      if (this.familyName != "") {
        // save img
        let uid = firebase.auth().currentUser.uid

        this.loading.present().then(() => {
          firebase.storage()
            .ref("family/" + uid + "/familyPicture.jpg")
            .putString(this.img, "data_url")
            .then(async (snapshot) => {
              let urlDownload = await snapshot.ref.getDownloadURL()
              var ref = firebase.database().ref("family/" + uid)
              var family ={
                familyName: this.familyName,
                familyPicture: urlDownload
              }
              ref.set(family)
              .then(async () => {
                this.loading.dismiss()

                // get family
                this.storage.get("family")
                .then((family_storage)=>{
                  if(family_storage!=null){
                    Object.assign(family,family_storage)
                  }
                  this.storage.set("family",family).then(()=>{
                    this.router.navigate(["tabs/family"])
                  })
                })

                
               
              }).catch((error) => {
                alert(error)
              })
            }).catch((error) => {
              alert(error)
            })
        })
      } else {
        alert("กรุณาตั่งชื่อครอบครัว")
      }
    } else {
      alert("กรุณาเลือกรูปครอบครัว")
    }
  }


}

