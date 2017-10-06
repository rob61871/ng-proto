import { RouterModule } from '@angular/router'

import { LoginComponent } from './components/login/login.component'

export const LoginRoutes = RouterModule.forChild([
  {
    path: 'login',
    component: LoginComponent,
  },
])
