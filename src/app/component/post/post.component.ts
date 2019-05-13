import { Component, OnInit, Input } from '@angular/core';
import { HelperService } from '../../helper.service'
import * as firebase from 'firebase'
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() board
  @Input() family
  counter = 0
  commentShow = false
  comments = []
  commentContent = ""
  post_id = ""
  constructor(private helperService:HelperService) { }

  ngOnInit() {
     
    this.post_id = this.board.id
     if(this.board.comments){
      this.comments = this.helperService.snapshotToArray(this.board.comments)
      
      
     }else{
       console.log("not have");
       
     }

  }
  
  clickComment(){
    this.commentShow = !this.commentShow
  }

  comment(){
    if(this.commentContent!=""){
      firebase.database().ref("board/"+this.post_id+"/comments")
        .push({
          content:this.commentContent,
          family_img:this.family.familyPicture,
          family_name:this.family.familyName,
          timestamp:new Date().getTime()
        }).then(()=>{
          this.commentContent = ""
        }).catch((error)=>{
          alert(error)
        })
    }
  }

}
