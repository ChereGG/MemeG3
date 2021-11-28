import { Component, OnInit } from '@angular/core';
import {Post} from '../../models/Post.model';
import {PostService} from '../../services/post.service';
import {User} from '../../models/User.model';
import {UserService} from '../../services/user.service';
import {MatDialog, MatDialogModule, MatDialogConfig, DialogPosition} from '@angular/material/dialog';
import {ImageDialogComponent} from '../image-dialog/image-dialog.component';
import {NoopScrollStrategy} from '@angular/cdk/overlay';
import {DescriptionDialogComponent} from '../description-dialog/description-dialog.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  posts: Post[];
  user: User;
  constructor(private postService: PostService, private userService: UserService, public dialog: MatDialog) {
      postService.getAllProfilePosts().subscribe(data => {
      this.posts = data;
      console.log(this.posts);
    });
      userService.getUserById('1').subscribe(data => {
        this.user = data;
      });

  }

  changePicture(): void {
    const config = new MatDialogConfig();
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      disableClose: true,
      autoFocus: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const formData = new FormData();
        formData.append('image', result);
        this.userService.changeImage(formData).subscribe(response => {
          console.log(response);
          window.location.reload();
        });
      }
    });
  }

  ngOnInit(): void {

  }


    getImagePath(path: string): string{
    return 'http://localhost:8080' + path;
  }

  changeDescription(): void {
    const config = new MatDialogConfig();
    const dialogRef = this.dialog.open(DescriptionDialogComponent, {
      disableClose: true,
      autoFocus: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const formData = new FormData();
        formData.append('descriere', result);
        this.userService.changeDescription(formData).subscribe(response => {
          console.log(response);
          window.location.reload();
        });
      }
    });
  }
}
