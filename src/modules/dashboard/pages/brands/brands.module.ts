import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { LoadingModule } from 'ngx-loading'
import { UIModule } from '../../../ui/uimodule.module'

import { BrandMenuComponent } from './components/menu/menu.component'
import { BrandsPageComponent } from './brands.component'

import { BrandsRoutes } from './brands.routes'

@NgModule({
  declarations: [
    BrandMenuComponent,
    BrandsPageComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    LoadingModule,
    UIModule,
    BrandsRoutes,
    NgbModule,
  ],
  exports: [
    BrandsPageComponent
  ],
})
export class BrandsModule { }
