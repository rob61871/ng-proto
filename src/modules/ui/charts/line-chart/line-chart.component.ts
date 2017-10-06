import { Component, OnInit } from '@angular/core'
import { MetricsService } from '../../../dashboard/services/metrics.service'
import { ErrorHandler } from '../../../../providers/error/handler'

import * as moment from 'moment'

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  providers: [
    MetricsService,
    ErrorHandler,
  ],
})
export class LineChartComponent implements OnInit {
  protected metricsService: MetricsService
  protected erroHandler: ErrorHandler
  protected view: any
  protected showXAxis: boolean
  protected showYAxis: boolean
  protected gradient: boolean
  protected showLegend: boolean
  protected showXAxisLabel: boolean
  protected showYAxisLabel: boolean
  protected yAxisLabel: string
  protected xAxisLabel: string
  protected autoScale: boolean
  public dateStart: string
  public dateEnd: string
  public impressionData: any

  initDate() {
    this.dateStart = moment().subtract(219, 'days').format('YYYY-MM-DD')
    this.dateEnd = moment().subtract(213, 'days').format('YYYY-MM-DD')
  }

  initLineChart() {
    this.impressionData = []
    this.view = [600, 400]
    this.showXAxis = true
    this.showYAxis = true
    this.gradient = false
    this.showLegend = true
    this.showXAxisLabel = true
    this.showYAxisLabel = true
    this.yAxisLabel = 'Rates'
    this.xAxisLabel = 'View Types'
    this.autoScale = true
  }

  constructor(errorHandler: ErrorHandler, metricsService: MetricsService) {
    this.metricsService = metricsService
    this.erroHandler = errorHandler
    this.initDate()
    this.initLineChart()
  }

  ngOnInit() {
    this.metricsService.tvAudienceByIndustryMetrics(this.dateStart, this.dateEnd)
    .map((response) => response.json())
    .map((response) => response.data)
    .subscribe(response => {
      console.log(response)
    })
  }
}
