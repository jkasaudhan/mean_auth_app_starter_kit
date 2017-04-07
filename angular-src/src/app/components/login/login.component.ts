import { Component, OnInit } from '@angular/core';
import { ValidateService }  from '../common/services/validate.service';
import { NotificationService } from '../common/services/notification.service';
import { AuthService } from '../common/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username: String;
  email: String;
  password: String;
  
  constructor(
            private vs: ValidateService,
            private ns: NotificationService, 
            private authService: AuthService,
            private router: Router) { }
  
  onLoginSubmit() {
    var user = {
        username: this.username,
        email: this.email,
        password: this.password
    };
    
    if(!this.vs.validateLoginUser(user)) {
        this.ns.show('Please fill all the fileds.', {});
        return false;
    }
    
    if(!this.vs.validateEmail(user.email)) {
        this.ns.show('Please enter valid email address.', {});
        return false;
    }
    console.log('sending req...', user);
    this.authService.authenticateUser(user).subscribe(res => {
        console.log("Login res: ", res);
        if(res.status === 'success') {
        
            this.authService.saveUserDataLocally(res.data.token, JSON.stringify(res.data.user));
            this.router.navigate(['dashboard']);
        }else {
            this.ns.show(res.message, {msgType: 'error'});
            return false;
        }
    });
    
    
  }

  ngOnInit() {
  }

}
