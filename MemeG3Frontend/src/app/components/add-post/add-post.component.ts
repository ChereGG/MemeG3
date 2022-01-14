import {Component, ComponentFactoryResolver, EventEmitter, OnInit, Output, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {PostService} from '../../services/post.service';
import {PostUpload} from '../../models/PostUpload.model';
import {outputPath} from '@angular-devkit/build-angular/src/test-utils';
import {ToastService} from '../../services/toast.service';
import {DialogLayoutDisplay} from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})

export class AddPostComponent implements OnInit {
  /**
   * Class used to add a post
   */
  selectedFile: File;
  postForm;
  shortcuts;
  isToggled = false;

  @Output() memePosted = new EventEmitter<any>();

  constructor(private postService: PostService,
              private formBuilder: FormBuilder,
              private contRef: ViewContainerRef,
              private toastService: ToastService){}


  /**
   * Initializes the form used to add a post
   */
  ngOnInit(): void {
    this.postForm = this.formBuilder.group(
      {
        title: new FormControl('', { updateOn: 'change'}),
        description: new FormControl('', { updateOn: 'change'}),
        page: new FormControl('', { updateOn: 'change'})

      });
  }


  /**
   * Changes the selected file to the newly selected one
   * @param event
   */
  onFileChanged(event): void {
    this.selectedFile = event.target.files[0];
  }

  /**
   * Method used to save the post
   * Gets the content from the form and sends the data to the backend
   */
  saveP(): void
  {
    const title = this.postForm.controls.title.value;
    const description = this.postForm.controls.description.value;
    const post = new PostUpload(description, title);
    this.postService.addPost(post, this.selectedFile).subscribe((data) => {
      console.log(data);
      this.toastService.toastNotification('', 'Meme added successfully!', DialogLayoutDisplay.SUCCESS);
      this.isToggled = false;
      this.memePosted.emit(data);
    }, error => {
      this.toastService.toastNotification('Error', 'An error has occurred while adding meme', DialogLayoutDisplay.WARNING);
    });

  }

  /**
   * Toggles the from fields if the user wants to add a meme and after the user added one
   */
  toggleForm(): void
  {
    this.isToggled = !this.isToggled;

  }

}
