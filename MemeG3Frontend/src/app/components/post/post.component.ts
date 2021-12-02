import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../models/Post.model';
import {MemeDialogComponent} from '../meme-dialog/meme-dialog.component';
import {NoopScrollStrategy} from '@angular/cdk/overlay';
import {MatDialog} from '@angular/material/dialog';
import {Router} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
  @Input() post?: Post = null;
  constructor(private router: Router, private dialog: MatDialog) { }
  ngOnInit(): void {
  }

  openMemeDialog(image: string): void {
       this.dialog.open(MemeDialogComponent, {
                        scrollStrategy: new NoopScrollStrategy(),
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
}
