import { Component } from '@angular/core';
import { AuthService } from './service/utils/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  isLogin: boolean = false
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLogin = this.authService.isAdmin()
  }
}
