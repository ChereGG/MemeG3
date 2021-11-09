import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProfilePageComponent} from './components/profile-page/profile-page.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  { path: 'profile', component: ProfilePageComponent },
  {path: '', component: AppComponent}
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
