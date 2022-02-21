import { Component, OnInit } from '@angular/core';
import { AccountService } from './../_service/account.service';
import { User } from '../_modules/User';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  title = 'Dating App';
  model: any = {};
  user: User = { username: 'User', token: '' };
  isLoggedIn: boolean = false;
  //currentUser$: Observable<User>;

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {
    //this.getCurrentUser();
    //this.currentUser$ = this.accountService.currentUser$;
  }

  login() {
    //console.log(this.model);
    this.accountService.loginTask(this.model).subscribe(
      (response) => {
        console.log(response);
        // this.isLoggedIn = true;
        this.user = {
          username: this.model.username,
        } as User;
      },
      (error) => {
        console.log(error);
        alert(error.error);
      }
    );
  }

  logout() {
    this.accountService.logout();
    // this.isLoggedIn = false;
  }

  // getCurrentUser() {

  //   this.accountService.currentUser$.subscribe( //not best practice
  //     (user) => {
  //       this.isLoggedIn = !!user;

  //       this.user = user;
  //       console.log(user);
  //     },
  //     (error) => {
  //       console.log(error);
  //       // alert(error.error);
  //     }
  //   );
  // }
}
