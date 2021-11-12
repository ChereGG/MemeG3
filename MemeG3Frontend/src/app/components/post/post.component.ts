import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../models/Post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
  @Input() post?: Post = null;
  constructor() { }
  ngOnInit(): void {
  }

    getImagePath(path: string): string{
    return 'http://localhost:8080' + path;
  }
}
