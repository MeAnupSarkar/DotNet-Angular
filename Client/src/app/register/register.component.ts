import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from './../_service/account.service';
import { User } from '../_modules/User';
import { UserRegister } from './../_modules/UserRegister';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model = {} as UserRegister;
  // @Input() usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter();

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  register() {
    console.log(this.model);

    this.accountService.registerTask(this.model).subscribe(
      (response) => {
        console.log(response);
        this.toastr.success('Registration Successfull!');
        this.cancel();
      },
      (error) => {
        console.log(error);
        //alert(error.error);
        this.toastr.error(error.error);
      }
    );
    //  console.log(this.usersFromHomeComponent);
  }

  cancel() {
    console.log('cancelled');
    this.cancelRegister.emit(false);
  }
}
