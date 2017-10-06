import { Component, Input, Output, EventEmitter } from '@angular/core'

import { Chart } from '../interfaces'

import { MetricsService } from '../../../dashboard/services/metrics.service'
import { ChartDataService } from '../../../dashboard/services/chart.service'
import { ErrorHandler } from '../../../../providers/error/handler'
import { UserService } from '../../../../providers/user.service'
import { ColorScheme } from '../../../dashboard/models/colorScheme.model'
import { COLORSCHEMES } from '../../../dashboard/utils/color-sets'
import { ChartDataFilterComponent } from '../../filters/chart-data-filter/chart-data-filter.component'

@Component({
  selector: 'app-master-chart',
  templateUrl: 'master-chart.component.html',
  // template: `
  //
  // `,
  styleUrls: ['master-chart.component.css'],
  providers: [
    MetricsService,
    ChartDataService,
    ErrorHandler,
    UserService,
  ],
})

export class MasterChartComponent {
  @Input() charts: Chart[] = []
  @Output() select = new EventEmitter()

  selectChart(chart: Chart) {
    this.select.emit(chart)
    // console.log(this.chart)
  }

}
