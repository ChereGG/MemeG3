import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {User} from '../../models/User.model';
import {Observable} from 'rxjs';
import {debounceTime, finalize, map, startWith, switchMap, tap} from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import {LoginRestService} from '../../services/login-rest.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  id = localStorage.getItem('idUser');

  constructor(private router: Router,
              private userService: UserService,
              private loginRestService: LoginRestService) { }

  myControl = new FormControl();
  searchName: '';
  isLoading = false;
  options: User[] = [
    {first_name: 'Tudor', last_name: 'Bal'},
    {first_name: 'Jack', last_name: 'Jolo'},
    {first_name: 'Budy', last_name: 'Judy'}
  ];

  searchedUsers: any[];
  ngOnInit(): void {

    this.myControl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.searchedUsers = [];
          this.isLoading = true;
        }),
        switchMap(value => this.userService.searchUsersByName(value)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            }),
          )
        )
      )
      .subscribe(data => {
        console.log(data);
        this.searchedUsers = data;
      });
  }

   getImagePath(path: string): string{
    return 'http://localhost:8080' + path;
  }

  navigateToUserProfile(userID: string): void{
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['profile/' + userID]));
  }

  logout(): void {
    this.router.navigate(['login']);
  }
}
