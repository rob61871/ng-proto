import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { TermsComponent } from './components/terms/terms.component'
import { PrivacyComponent } from './components/privacy/privacy.component'
import { CopyrightComponent } from './components/copyright/copyright.component'

import { LegalRoutes } from './legal.routes'

@NgModule({
  declarations: [
    TermsComponent,
    PrivacyComponent,
    CopyrightComponent,
  ],
  imports: [
    BrowserModule,
    LegalRoutes,
  ],
  exports: []
})
export class LegalModule { }
