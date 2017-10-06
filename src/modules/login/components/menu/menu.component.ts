import { Component, OnInit } from '@angular/core'
import { AuthenticateService } from '../../../../providers/auth/authenticate.service'
import { UserService } from '../../../../providers/user.service'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-login-menu',
  templateUrl: 'menu.component.html',
})
export class LoginMenuComponent implements OnInit {
  protected authService: AuthenticateService
  protected userService: UserService
  protected user: any

  constructor(
    authService: AuthenticateService,
    userService: UserService,
  ) {
    this.authService = authService
    this.userService = userService
    this.user = {
      id: '',
      username: '',
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated()
  }

  onClickLogout() {
    return this.authService.logout()
  }

  ngOnInit() {
    this.userService.getProfile()
    .map((response) => response.json())
    .subscribe(response => {
      // console.log(response)
      // console.log(response.data.name)
      this.user.id = response.data.id
      this.user.username = response.data.username
      // console.log(this.user.id)
    })
  }
}
