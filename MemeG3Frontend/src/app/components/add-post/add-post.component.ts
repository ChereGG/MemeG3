import {Component, ComponentFactoryResolver, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {PostService} from '../../services/post.service';
import {PostUpload} from '../../models/PostUpload.model';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  selectedFile: File;
  postForm;
  shortcuts;

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
    }, error => {

    });

  }

}
