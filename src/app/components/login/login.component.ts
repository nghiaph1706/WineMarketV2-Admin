import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/service/user/user.service';
import { AuthService } from 'src/app/service/utils/auth.service';
import { MessageService } from 'src/app/service/utils/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })
  constructor(private messageService: MessageService, private userService: UserService, private cookieService: CookieService, private route: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.userService.login(this.loginForm.value).subscribe(
      data => {
        this.cookieService.set('token', data.token);
        this.cookieService.set('user_Id', data.userId);
        this.cookieService.set('isAdmin', data.isAdmin);
        if (Boolean(JSON.parse(data.isAdmin))) {
          this.messageService.showSuccess('Login success!')
          window.location.reload()
        } else {
          this.messageService.showError('Login failed. Please try again.')
        }
      },
      error => {
        this.messageService.showError('Login failed. Please try again.')
        this.userService.logout()
      }
    )
  }
}
