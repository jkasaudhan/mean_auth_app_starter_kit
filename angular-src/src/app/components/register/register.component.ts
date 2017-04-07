import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../common/services/validate.service';
import { NotificationService } from '../common/services/notification.service';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  confirmPassword: String;
  
  constructor(private vs: ValidateService, private ns: NotificationService, private authService: AuthService) { }

  onRegisterSubmit() {
    var user = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
    };
    
    if(!this.vs.validateRegisterUser(user)) {
        this.ns.show('Please fill all the fields', {msgType: 'error'});
        return false;
    }
    
    if(!this.vs.validateEmail(user.email)) {
        this.ns.show('Please enter valid email address', {msgType: 'success'});
        return false;
    }
    
    if(user.password !== user.confirmPassword) {
        this.ns.show('Password and confirm password mismatched.', {msgType: 'error'});
        return false;
    }
    
    this.authService.registerUser(user).subscribe(data => {
        console.log('Res: ', data);
    });
   
  }
    
  ngOnInit() {
  }

}
