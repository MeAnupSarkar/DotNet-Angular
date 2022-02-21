import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registerMode: boolean = false;

  constructor() {}

  ngOnInit(): void {
    // this.getUsers();
  }

  toggleRegisterMode() {
    this.registerMode = !this.registerMode;
  }

  // getUsers() {
  //   this.http.get('https://localhost:5001/api/Users').subscribe(
  //     (response) => {
  //       this.users = response;
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
