import { Component, OnInit } from '@angular/core'
import { AuthenticateService } from '../../../../providers/auth/authenticate.service'

@Component({
  selector: 'app-layout',
  templateUrl: 'base.component.html',
  styleUrls: [
    './base.component.css',
  ],
  providers: [
    AuthenticateService,
  ]
})
export class LayoutBaseComponent implements OnInit {
  protected authService: AuthenticateService
  constructor(authService: AuthenticateService) {
    this.authService = authService
  }

  ngOnInit() {}

  logoutClicked() {
    this.authService.logout()
  }
}
