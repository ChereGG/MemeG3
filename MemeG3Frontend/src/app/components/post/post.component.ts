import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from '../../models/Post.model';
import {MemeDialogComponent} from '../meme-dialog/meme-dialog.component';
import {NoopScrollStrategy} from '@angular/cdk/overlay';
import {MatDialog} from '@angular/material/dialog';
import {Router} from "@angular/router";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
  @Input() post?: Post = null;
  constructor(private router: Router, private dialog: MatDialog,private postService:PostService) {
    // this.post.is_liked_by_user = false;
  }

  @Output() commentsOpen = new EventEmitter<any>();

  ngOnInit(): void {
  }

  openMemeDialog(image: string): void {
       this.dialog.open(MemeDialogComponent, {
                        scrollStrategy: new NoopScrollStrategy(),
         height: '50%',
         width: '50%',
         panelClass: 'custom-dialog-container',
                        data: {
                          image
                        }
                      });
  }

    getImagePath(path: string): string{
    return 'http://localhost:8080' + path;
  }

  navigateToUserProfile(userID: string): void{
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['profile/' + userID]));
  }

  likePost(): void{

    const data = {
    };

    this.postService.likePost(data, this.post.id).subscribe(response => {
      console.log(response)
      if (response.message === 'Liked'){
          this.post.no_likes += 1;
          this.post.is_liked_by_user = true;
        }
        else if (response.message === 'Disliked'){
          this.post.no_likes -= 1;
          this.post.is_liked_by_user = false;
        }
    });
  }
}
