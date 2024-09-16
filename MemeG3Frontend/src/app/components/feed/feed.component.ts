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
  currentOpenComments = [];

  constructor(postService: PostService) {
    postService.getAllFeedPosts().subscribe(data => {
      this.list = data;
      console.log(this.list);
    });
  }

  ngOnInit(): void {
  }

  showComment(postId){
    const x = this.currentOpenComments.indexOf(postId);

    if(x >= 0){
      this.currentOpenComments.splice(x, 1);
    } else{
      this.currentOpenComments.push(postId);
    }
    console.log(this.currentOpenComments);
  }

  addCommentToPost(data){
    this.list.find(p => p.id === data.postId).comments.push(data.comment);
  }




}
