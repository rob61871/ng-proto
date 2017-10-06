import { Injectable } from '@angular/core'
import {
  Router,
  Route,
  CanActivate,
  CanActivateChild,
  CanLoad,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router'

import { AuthenticateService } from './authenticate.service'

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
  protected router: Router
  protected authService: AuthenticateService

  constructor(router: Router, authService: AuthenticateService) {
    this.router = router
    this.authService = authService
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const url: string = state.url

    return this.verify(url)
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(route, state)
  }

  canLoad(route: Route): boolean {
    return this.verify('/' + route.path)
  }

  verify(url: string): boolean {
    if (this.authService.isAuthenticated()) {
      return true
    }

    this.authService.redirectTo(url)

    this.router.navigate(['/login'])

    return false
  }
}
