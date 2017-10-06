import { RouterModule } from '@angular/router'

import { TermsComponent } from './components/terms/terms.component'
import { PrivacyComponent } from './components/privacy/privacy.component'
import { CopyrightComponent } from './components/copyright/copyright.component'

export const LegalRoutes = RouterModule.forRoot([
  {
    path: 'agreements/terms',
    component: TermsComponent,
  },
  {
    path: 'agreements/privacy',
    component: PrivacyComponent,
  },
  {
    path: 'agreements/copyright',
    component: CopyrightComponent,
  },
])
