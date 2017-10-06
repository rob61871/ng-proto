import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { UIModule } from '../ui/uimodule.module'
import { BrandsModule } from './pages/brands/brands.module'

import { DashboardMenuComponent } from './components/menu/menu.component'
import { DashboardHomeComponent } from './components/home/home.component'

import { DashboardRoutes } from './dashboard.routes'

@NgModule({
  declarations: [
    DashboardMenuComponent,
    DashboardHomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    NgbModule,
    BrandsModule,
    DashboardRoutes,
  ],
  exports: [
    DashboardMenuComponent,
  ],
})
export class DashboardModule { }
