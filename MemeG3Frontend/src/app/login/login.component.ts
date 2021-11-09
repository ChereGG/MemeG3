import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginRestService } from './login-rest.service';
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
    // ,private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  login() {
    this.loginRestService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
    // this.messageService.add({ severity: 'error', summary: 'Login error', detail: "Is the server on?" });
  }

  register() {
    this.loginRestService.register(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
  }


}
