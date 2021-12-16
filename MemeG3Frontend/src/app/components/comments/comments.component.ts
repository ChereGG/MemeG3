import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from "../../models/Comment.model";
import {FormBuilder, FormControl} from '@angular/forms';
import {PostUpload} from "../../models/PostUpload.model";
import {Post} from "../../models/Post.model";
import {PostService} from "../../services/post.service";
import {error} from "protractor";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  form;
  @Input() post?: Post;
  @Input() comments?: Array<Comment> = null;
  @Output() addComment? = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder,
              private postService: PostService) {
    this.form = this.formBuilder.group(
      {
        text: new FormControl('', { updateOn: 'change'}),
      });
  }


  saveComment(): void
  {
    const text = this.form.controls.text.value;
    this.postService.addComment(new Comment(this.post.id, text)).subscribe(data => {

      this.addComment.emit({comment: data, postId: this.post.id});
    }, error =>{
      console.log(error);
    });

  }

  ngOnInit(): void {
    console.log(this.post);
  }

}
