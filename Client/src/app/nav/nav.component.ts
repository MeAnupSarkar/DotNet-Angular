import { Component, OnInit } from '@angular/core';
import { AccountService } from './../_service/account.service';
import { User } from '../_modules/User';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

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
  faUserCircle = faUserCircle;

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    //this.getCurrentUser();
    //this.currentUser$ = this.accountService.currentUser$;
  }

  login() {
    //console.log(this.model);
    this.accountService.loginTask(this.model).subscribe(
      (response) => {
        console.log(response);
        this.router.navigateByUrl('/members');
        this.toastr.success('Login Successfull!');
      },
      (error) => {
        console.log(error);
        //  alert(error.error);
        this.toastr.error(error.error);
      }
    );
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
    this.toastr.warning('Logout !');
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
