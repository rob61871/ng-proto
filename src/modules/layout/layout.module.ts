import { NgModule } from '@angular/core'

import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { DashboardModule } from '../dashboard/dashboard.module'
import { LoginModule } from '../login/login.module'
import { UIModule } from '../ui/uimodule.module'

import { LayoutBaseComponent } from './components/base/base.component'
import { LayoutMenuComponent } from './components/menu/menu.component'


@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    NgbModule,
    DashboardModule,
    LoginModule,
    UIModule,
  ],
  exports: [
    LayoutBaseComponent,
  ],
  declarations: [
    LayoutBaseComponent,
    LayoutMenuComponent,
  ],
})
export class LayoutModule { }
