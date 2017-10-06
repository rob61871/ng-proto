import { NgModule } from '@angular/core'

import { SystemRoutes } from './system.routes'

import { NotFoundComponent } from './components/notfound/notfound.component'

@NgModule({
  declarations: [
    NotFoundComponent,
  ],
  imports: [
    SystemRoutes,
  ],
})
export class SystemModule { }
