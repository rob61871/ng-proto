import { RouterModule } from '@angular/router'

import { NotFoundComponent } from './components/notfound/notfound.component'

export const SystemRoutes = RouterModule.forRoot([
  {
    path: '**',
    component: NotFoundComponent,
  }
])
