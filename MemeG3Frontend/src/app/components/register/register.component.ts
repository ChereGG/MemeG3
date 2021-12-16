import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginRestService} from '../../services/login-rest.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {DialogLayoutDisplay} from '@costlydeveloper/ngx-awesome-popup';
import {ToastService} from '../../services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  selectedFile: File;
  isSubmitted = false;

  constructor(private fb: FormBuilder,
              private toastService: ToastService,
              private loginRestService: LoginRestService,
              private router: Router,
              private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required]],
      image: [null, [Validators.required]]
    });
  }

  checkForErrors(): string[] {
    const errorLst = [];
    Object.keys(this.loginForm.controls).forEach(loginFormKey => {
      console.log(loginFormKey);
      if (this.loginForm.get(loginFormKey).hasError('required')) {
        errorLst.push(loginFormKey);
      }
    });
    if (this.loginForm.get('email').hasError('email') && errorLst.indexOf('email') === -1) {
      errorLst.push('email');
    }
    return errorLst;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isSubmitted = true;
      this.toastService.toastNotification(
        'Success',
        'Successfully created a profile',
        DialogLayoutDisplay.SUCCESS);
      this.loginRestService
        .register(
          this.loginForm.controls.username.value,
          this.loginForm.controls.password.value
        )
        .toPromise()
        .then((response: any) => {
          if (response.message === 'ok') {
            alert('Register successful');
          }
          else {
            alert('error');
          }
        });
    } else {
      let errorString = '';
      this.checkForErrors().forEach(error => {
        errorString += error + '\n';
      });
      console.log(errorString);
      this.toastService.toastNotification(
        'Error',
        errorString,
        DialogLayoutDisplay.WARNING
      );
    }
  }

  onFileChanged(event): void {
    this.selectedFile = event.target.files[0];
  }
}
