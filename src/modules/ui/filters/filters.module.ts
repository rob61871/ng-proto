import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { ChartTypeFilterComponent } from './chart-type-filter/chart-type-filter.component'
import { ChartDataFilterComponent } from './chart-data-filter/chart-data-filter.component'

@NgModule({
  imports: [
    FormsModule,
    NgbModule,
    CommonModule
  ],
  exports: [
    ChartTypeFilterComponent,
    ChartDataFilterComponent,
  ],
  declarations: [
    ChartTypeFilterComponent,
    ChartDataFilterComponent,
  ]
})
export class FiltersModule { }
