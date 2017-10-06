import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

import { ChartsModule } from './charts/charts.module'
import { DynamicFormsModule } from './forms/dynamic-forms.module'
import { PartialsModule } from './partials/partials.module'
import { FiltersModule } from './filters/filters.module'

import { DateFilterComponent } from './filters/date-filter/date-filter.component'
import { DynamicFormComponent } from './forms/containers/dynamic-form/dynamic-form.component'
import { DynamicChartComponent } from './charts/dynamic-chart/dynamic-chart.component'

import { DatePickerComponent } from './datepicker/datepicker.component'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    DynamicFormsModule,
    PartialsModule,
    FiltersModule,
  ],
  exports: [
    DateFilterComponent,
    DatePickerComponent,
    DynamicFormComponent,
    ChartsModule,
    DynamicFormsModule,
    PartialsModule,
    FiltersModule,
    DynamicChartComponent,
  ],
  declarations: [
    DateFilterComponent,
    DatePickerComponent,
    DynamicChartComponent,
  ],
})
export class UIModule { }
