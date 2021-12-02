import { Component, OnInit } from '@angular/core';
import {Post} from '../../models/Post.model';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  list: Post[];
  constructor(postService: PostService) {
    postService.getAllFeedPosts().subscribe(data => {
      this.list = data;
      console.log(this.list);
    });
  }

  ngOnInit(): void {
  }

  addedMeme(newPost: any): void{
    this.list.push(newPost);
  }


}
