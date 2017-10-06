import { Component } from '@angular/core'

import { ChartDataFilterComponent } from '../../filters/chart-data-filter/chart-data-filter.component'
import { MasterChartComponent } from './master-chart.component'

@Component({
  selector: 'app-ext-donut-chart',
  templateUrl: 'ext-donut-chart.component.html'
})
export class ExtDonutChartComponent extends MasterChartComponent {
  onSelect(data) {
    console.log('Item clicked', data)
  }
}
