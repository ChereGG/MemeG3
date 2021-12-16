import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginRestService } from '../../services/login-rest.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
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
        // alert("orice")
        // alert(response.access)
        localStorage.setItem('token', 'Bearer ' + response.access);
        this.userService.getUserId().subscribe(response2 => {
          localStorage.setItem('idUser', response2.id);
          this.router.navigate(['profile/' + response2.id]);
        });
    }).catch(response => {
      alert('Login error');
    });
    // this.messageService.add({ severity: 'error', summary: 'Login error', detail: "Is the server on?" });
  }

  register(): void {
    this.loginRestService
      .register(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
      .toPromise()
      .then((response: any) => {
      if (response.message === 'ok') {
        alert('Register successful');
      }
      else {
        alert('error');
      }
    });
  }
}
