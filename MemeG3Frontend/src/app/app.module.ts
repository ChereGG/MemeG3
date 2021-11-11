import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, 
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
