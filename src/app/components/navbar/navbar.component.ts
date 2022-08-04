import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/entity/user.entity';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  user: User
  constructor(private userService: UserService, private cookieService: CookieService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.userService.find(this.cookieService.get('user_Id')).subscribe(res => {
      this.user = res
    })
  }

  switchLanguage(lang: string){
    this.cookieService.set("locale", lang)
    this.translate.use(lang)
  }

  onLogout(){
    this.userService.logout();
  }

}
