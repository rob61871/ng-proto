import { Component, EventEmitter, Input, Output, ContentChild, TemplateRef } from '@angular/core'

import { ChartDataFilterComponent } from '../../filters/chart-data-filter/chart-data-filter.component'
import { MasterChartComponent } from './master-chart.component'

@Component({
  selector: 'app-ext-bar-chart',
  templateUrl: 'ext-bar-chart.component.html',
})
export class ExtBarChartComponent extends MasterChartComponent {
  @Input() labels = false
  @Input() legend = false
  @Input() legendTitle: string = 'Legend'
  @Input() explodeSlices = false
  @Input() doughnut = false
  @Input() arcWidth = 0.25
  @Input() gradient: boolean
  @Input() activeEntries: any[] = []
  @Input() tooltipDisabled: boolean = false
  @Input() labelFormatting: any
  @Input() tooltipText: any

  @Output() select = new EventEmitter()
  @Output() activate: EventEmitter<any> = new EventEmitter()
  @Output() deactivate: EventEmitter<any> = new EventEmitter()

  @ContentChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>

  heading = 'I am a bar chart'

  onSelect(data) {
    console.log('Item clicked', data)
  }

}
