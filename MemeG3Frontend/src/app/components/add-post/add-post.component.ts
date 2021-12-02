import {Component, ComponentFactoryResolver, EventEmitter, OnInit, Output, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {PostService} from '../../services/post.service';
import {PostUpload} from '../../models/PostUpload.model';
import {outputPath} from '@angular-devkit/build-angular/src/test-utils';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})

export class AddPostComponent implements OnInit {
  selectedFile: File;
  postForm;
  shortcuts;
  isToggled = false;

  @Output() memePosted = new EventEmitter<any>();

  constructor(private postService: PostService,
              private formBuilder: FormBuilder,
              private contRef: ViewContainerRef){}



  ngOnInit(): void {
    this.postForm = this.formBuilder.group(
      {
        title: new FormControl('', { updateOn: 'change'}),
        description: new FormControl('', { updateOn: 'change'}),
        page: new FormControl('', { updateOn: 'change'})

      });
  }


  onFileChanged(event): void {
    this.selectedFile = event.target.files[0];
  }

  saveP(): void
  {
    const title = this.postForm.controls.title.value;
    const description = this.postForm.controls.description.value;
    const post = new PostUpload(description, title);
    this.postService.addPost(post, this.selectedFile).subscribe((data) => {
      console.log(data);
      alert('Meme posted!');
      this.isToggled = false;
      this.memePosted.emit(data);
    }, error => {

    });

  }

  toggleForm(): void
  {
    this.isToggled = !this.isToggled;

  }

}
