import { NgModule } from '@angular/core'
import { Router } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser'
import { HttpModule } from '@angular/http'
import { OAuthModule } from 'angular-oauth2-oidc'
import { SuiModule } from 'ng2-semantic-ui'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { LoadingModule } from 'ngx-loading'

import { LayoutModule } from '../modules/layout/layout.module'
import { SystemModule } from '../modules/system/system.module'
import { LoginModule } from '../modules/login/login.module'
import { DashboardModule } from '../modules/dashboard/dashboard.module'
import { UIModule } from '../modules/ui/uimodule.module'
import { LegalModule } from '../modules/legal/legal.module'

import { HttpService } from '../providers/http.service'
import { AuthenticateService } from '../providers/auth/authenticate.service'
import { UserService } from '../providers/user.service'
import { AuthGuardService } from '../providers/auth/guard.service'

import { IspotComponent } from './ispot.component'

@NgModule({
  providers: [
    AuthenticateService,
    UserService,
    AuthGuardService,
    HttpService,
  ],
  declarations: [
    IspotComponent,
  ],
  imports: [
    UIModule,
    SuiModule,
    BrowserModule,
    HttpModule,
    OAuthModule.forRoot(),
    LoadingModule,
    LayoutModule,
    LegalModule,
    DashboardModule,
    LoginModule,
    SystemModule,
    NgbModule.forRoot(),
  ],
  bootstrap: [
    IspotComponent,
  ],
})
export class IspotModule {
  constructor(router: Router) {
  }
}
