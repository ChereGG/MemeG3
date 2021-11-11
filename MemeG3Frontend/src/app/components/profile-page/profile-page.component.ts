import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  list: number[] = [1, 2, 3, 4];
  constructor() { }

  ngOnInit(): void {
  }

}
