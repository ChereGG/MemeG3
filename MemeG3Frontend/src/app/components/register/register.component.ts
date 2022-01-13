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
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      descriere: ['', [Validators.required]],
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
      this.loginRestService
        .register(
          this.loginForm.controls.username.value,
          this.loginForm.controls.password.value,
          this.loginForm.controls.first_name.value,
          this.loginForm.controls.last_name.value,
          this.loginForm.controls.email.value,
          this.loginForm.controls.descriere.value,
          this.selectedFile
        )
        .toPromise()
        .then((response: any) => {
          if (response.message === 'ok') {
            this.toastService.toastNotification(
              'Success',
              'Successfully created a profile',
              DialogLayoutDisplay.SUCCESS
            );
            this.loginRestService
              .login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
              .toPromise()
              .then((loginResponse: any) => {
                localStorage.setItem('token', 'Bearer ' + loginResponse.access);
                this.userService.getUserId().subscribe(getUserResponse => {
                  localStorage.setItem('idUser', getUserResponse.id);
                  this.router.navigate(['profile/' + getUserResponse.id]);
                });
              }).catch(() => {
                this.toastService.toastNotification('Error', 'Login has failed', DialogLayoutDisplay.WARNING);
              });
          }
          else {
            this.toastService.toastNotification(
              'Error',
              'Error while creating profile',
              DialogLayoutDisplay.WARNING
            );
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
