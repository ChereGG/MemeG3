import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoginRestService} from '../../services/login-rest.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ToastService} from '../../services/toast.service';
import {DialogLayoutDisplay} from '@costlydeveloper/ngx-awesome-popup';

// import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;


  constructor(private fb: FormBuilder,
              private loginRestService: LoginRestService,
              private router: Router,
              private userService: UserService,
              private toastService: ToastService
    // ,private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  login(): void {
    this.loginRestService
      .login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
      .toPromise()
      .then((response: any) => {
        localStorage.setItem('token', 'Bearer ' + response.access);
        this.userService.getUserId().subscribe(response2 => {
          localStorage.setItem('idUser', response2.id);
          this.router.navigate(['profile/' + response2.id]);
        });
    }).catch(response => {
      this.toastService.toastNotification('Error', 'Login has failed', DialogLayoutDisplay.WARNING);
    });
  }

  register(): void {
    this.loginRestService.logout();
    this.router.navigate(['register']);
  }
}
