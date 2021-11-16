import { Component, OnInit } from '@angular/core';
import {Post} from '../../models/Post.model';
import {PostService} from '../../services/post.service';
import {User} from '../../models/User.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  posts: Post[];
  user: User;
  constructor(postService: PostService, userService: UserService) {
      postService.getAllProfilePosts().subscribe(data => {
      this.posts = data;
      console.log(this.posts);
    });
      userService.getUserById('1').subscribe(data => {
        this.user = data;
      });

  }

  ngOnInit(): void {

  }


    getImagePath(path: string): string{
    return 'http://localhost:8080' + path;
  }

}
