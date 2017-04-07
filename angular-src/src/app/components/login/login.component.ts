import { Component, OnInit } from '@angular/core';
import { ValidateService }  from '../common/services/validate.service';
import { NotificationService } from '../common/services/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  email: String;
  password: String;
  
  constructor(private vs: ValidateService, private ns: NotificationService) { }
  
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
    }
  }

  ngOnInit() {
  }

}
