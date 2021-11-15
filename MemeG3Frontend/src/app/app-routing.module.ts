import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { AppComponent } from './app.component';
import {FeedComponent} from './components/feed/feed.component';
import {AddPostComponent} from './components/add-post/add-post.component';

const routes: Routes = [
  { path: 'profile', component: ProfilePageComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: AppComponent },
  {path: 'feed', component: FeedComponent},
  {path: 'addPost', component: AddPostComponent},

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
