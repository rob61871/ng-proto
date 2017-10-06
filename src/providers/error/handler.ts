import { Injectable } from '@angular/core'
import { AuthenticateService } from '../auth/authenticate.service'

@Injectable()
export class ErrorHandler {
  protected authService: AuthenticateService

  constructor(authService: AuthenticateService) {
    this.authService = authService
  }

  on(error) {
    if (error.status === 401) {
      return this.authService.logout()
    }
  }
}
