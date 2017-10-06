import { RouterModule } from '@angular/router'

import { AuthGuardService } from '../../providers/auth/guard.service'

import { DashboardHomeComponent } from './components/home/home.component'

export const DashboardRoutes = RouterModule.forRoot([
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard',
  },
  {
    path: 'dashboard',
    component: DashboardHomeComponent,
    canActivate: [AuthGuardService],
    canLoad: [AuthGuardService],
  },
])
