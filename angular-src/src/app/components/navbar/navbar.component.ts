import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { NotificationService } from '../common/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarTitle = "MEAN AUTH APP";
  
  constructor(
    private authService: AuthService,
    private ns: NotificationService,
    private router: Router
  ) { 
    
  }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
    this.ns.show("User logged out successfully!!", {msgType: 'success'});
    this.router.navigate(['login']);
  }
}
