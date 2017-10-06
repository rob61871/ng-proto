import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { LoadingModule } from 'ngx-loading'

import { CardComponent } from './card/card.component'
import { CardBlockComponent } from './card-block/card-block.component'
import { CardHeaderComponent } from './card-header/card-header.component'

@NgModule({
  imports: [
    BrowserModule,
    LoadingModule,
  ],
  exports: [
    CardComponent,
    CardBlockComponent,
    CardHeaderComponent,
  ],
  declarations: [
    CardComponent,
    CardBlockComponent,
    CardHeaderComponent,
  ],
})
export class PartialsModule { }
