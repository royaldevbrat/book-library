import { Component, OnInit, ViewContainerRef } from '@angular/core';
// import {ValidateService} from '../services/validate.service'
import {AuthService} from '../services/auth.service'
import {Router} from '@angular/router';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: String;
  email: String;
  phone: String;
  password: String;
  // public loading = false;

  constructor(
    // private validateService: ValidateService,
    private authService:AuthService,
    private router: Router,
    // public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    // this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
  }

  onRegisterSubmit(){
    // this.loading = true;
    const user = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password
    }
    console.log(user);

    // Required Fields
    // if(!this.validateService.validateRegister(user)){
    //   this.loading = false;
      // this.toastr.error('Please fill all detail!', 'Error!');
    //   return false;
    // }

    // Validate Email
    // if(!this.validateService.validateEmail(user.email)){
    //   this.loading = false;
      // this.toastr.error('Please fill valid email!', 'Error!');
    //   return false;
    // }

    // if(!this.validateService.validatePhone(user.phone)){
    //   this.loading = false;
      // this.toastr.error('Please fill valid mobile number!', 'Error!');
    //   return false;
    // }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        // this.loading = false;
        this.router.navigate(['/login']);
      } else {
        // this.loading = false;
        // this.toastr.error(data.msg);
        this.router.navigate(['/register']);
      }
    });

  }

}



