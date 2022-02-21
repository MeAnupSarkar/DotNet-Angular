import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../_modules/User';
import { ReplaySubject } from 'rxjs';
import { UserRegister } from './../_modules/UserRegister';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl: string = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<User>(1); // 1 = Size Buffer (How many user object we want to store)
  currentUser$ = this.currentUserSource.asObservable(); // observable types requires $ sign in the end

  constructor(private http: HttpClient) {}

  loginTask(model: any) {
    console.log(model);

    return this.http.post(this.baseUrl + 'Account/login', model).pipe(
      map((response: User) => {
        const user = response;

        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          console.log(user);

          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  registerTask(model: UserRegister) {
    console.log(model);

    return this.http.post(this.baseUrl + 'Account/register', model).pipe(
      map((response: User) => {
        const user = response;

        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          console.log(user);
          this.setCurrentUser(user);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser = (user: User) => this.currentUserSource.next(user);
  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
