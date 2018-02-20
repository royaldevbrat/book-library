import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
// import {FlashMessagesService} from 'angular2-flash-messages';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;
  public loading = false;

  constructor(
    private authService:AuthService,
    private router:Router,
    // public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) { 
    // this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  onLoginSubmit(){
    this.loading = true;
    const user = {
      email: this.email,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.loading = false;
        localStorage.setItem('isLoggedin', 'true');
        this.router.navigate(['books']);
      } else {
        this.loading = false;
        // this.toastr.error(data.msg, 'Error!');
      }
    });
  }

}
