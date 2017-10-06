import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { IMessage } from 'ng2-semantic-ui'

import { AuthenticateService } from '../../../../providers/auth/authenticate.service'

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
  protected username: string
  protected password: string
  protected rememberMe: boolean
  protected error: boolean
  protected isLoging: boolean
  protected router: Router
  protected authService: AuthenticateService

  public constructor(router: Router, authService: AuthenticateService) {
    this.router = router
    this.authService = authService
    this.isLoging = false
    this.error = false
  }

  public ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/'])
    }

    this.username = localStorage.getItem('username')
    this.password = localStorage.getItem('password')
    this.rememberMe = (localStorage.getItem('rememberMe') === 'true')
  }

  public login(username, password) {
    this.isLoging = true
    this.error = false

    if (this.rememberMe) {
      localStorage.setItem('rememberMe', 'true')
      localStorage.setItem('username', username)
      localStorage.setItem('password', password)
    }

    this.authService.login(username, password).then(() => {
      this.isLoging = false
      this.error = false

      this.router.navigate(['/'])
    }).catch((error) => {
      this.error = true
      this.isLoging = false
    })
  }

  public isError() {
    return this.error
  }
}
