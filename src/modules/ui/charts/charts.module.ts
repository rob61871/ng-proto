import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { NgxChartsModule } from '@swimlane/ngx-charts'
import { Ng2SmartTableModule } from 'ng2-smart-table'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { LoadingModule } from 'ngx-loading'

import { ChartDataService } from '../../dashboard/services/chart.service'
import { MetricsService } from '../../dashboard/services/metrics.service'
import { UserService } from '../../../providers/user.service'
import { ErrorHandler } from '../../../providers/error/handler'

import { DynamicFormsModule } from '../forms/dynamic-forms.module'
import { PartialsModule } from '../partials/partials.module'
import { FiltersModule } from '../filters/filters.module'

import { AreaChartComponent } from './area-chart/area-chart.component'
import { BarChartComponent } from './bar-chart/bar-chart.component'
import { DonutChartComponent } from './donut-chart/donut-chart.component'
import { DynamicChartComponent } from './dynamic-chart/dynamic-chart.component'
import { LineChartComponent } from './line-chart/line-chart.component'
import { SpotFeedComponent } from './spot-feed/spot-feed.component'
import { SpotTableComponent } from './spot-table/spot-table.component'

import { MasterChartComponent } from './master-chart/master-chart.component'
import { ExtBarChartComponent } from './master-chart/ext-bar-chart.component'
import { ExtDonutChartComponent } from './master-chart/ext-donut-chart.component'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgxChartsModule,
    Ng2SmartTableModule,
    NgbModule,
    DynamicFormsModule,
    PartialsModule,
    ReactiveFormsModule,
    LoadingModule,
    FiltersModule,
  ],
  exports: [
    AreaChartComponent,
    BarChartComponent,
    DonutChartComponent,
    LineChartComponent,
    SpotFeedComponent,
    SpotTableComponent,
    MasterChartComponent,
    ExtBarChartComponent,
    ExtDonutChartComponent,
  ],
  providers: [
    ChartDataService,
    MetricsService,
    UserService,
    ErrorHandler
  ],
  declarations: [
    AreaChartComponent,
    BarChartComponent,
    DonutChartComponent,
    LineChartComponent,
    SpotFeedComponent,
    SpotTableComponent,
    MasterChartComponent,
    ExtBarChartComponent,
    ExtDonutChartComponent,
  ]
})
export class ChartsModule { }
