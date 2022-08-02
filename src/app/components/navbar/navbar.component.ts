import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/entity/user.entity';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  user: User
  constructor(private userService: UserService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.userService.find(this.cookieService.get('user_Id')).subscribe(res => {
      this.user = res
    })
  }

  onLogout(){
    this.userService.logout();
  }

}
