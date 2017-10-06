import { Component, OnInit } from '@angular/core'

import { UserService } from '../../../../providers/user.service'
import { MetricsService } from '../../../dashboard/services/metrics.service'
import { ErrorHandler } from '../../../../providers/error/handler'

import * as moment from 'moment'
import * as d3 from 'd3'

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css'],
  providers: [
    MetricsService,
    ErrorHandler,
    UserService,
  ],
})

export class AreaChartComponent implements OnInit {
  protected metricsService: MetricsService
  protected erroHandler: ErrorHandler
  protected userService: UserService
  protected view: any
  protected showXAxis: boolean
  protected showYAxis: boolean
  protected gradient: boolean
  protected showLegend: boolean
  protected showXAxisLabel: boolean
  protected showYAxisLabel: boolean
  protected yAxisLabel: string
  protected xAxisLabel: string
  protected schemeType: string
  protected autoScale: boolean
  protected timeline: boolean
  protected showGridLines: boolean
  protected roundDomains: boolean
  protected curveType: string
  protected curve: any
  protected length: any
  protected tooltipDisabled: boolean
  public dateStart: string
  public dateEnd: string
  public digitalData: any

  initDate() {
    this.dateStart = moment().subtract(219, 'days').format('YYYY-MM-DD')
    this.dateEnd = moment().subtract(213, 'days').format('YYYY-MM-DD')
  }

  initAreaChart() {
    this.digitalData = []
    this.view = [600, 400]
    this.showXAxis = true
    this.showYAxis = true
    this.gradient = false
    this.showLegend = true
    this.showXAxisLabel = true
    this.showYAxisLabel = true
    this.yAxisLabel = 'Rates'
    this.xAxisLabel = 'View Types'
    this.schemeType = 'ordinal'
    this.autoScale = true
    this.timeline = false
    this.showGridLines = true
    this.roundDomains = false
    this.curveType = 'Cardinal'
    this.curve = d3.curveCardinal
    this.length = []
    this.tooltipDisabled = true
  }

  constructor(errorHandler: ErrorHandler, metricsService: MetricsService, userService: UserService) {
    this.metricsService = metricsService
    this.erroHandler = errorHandler
    this.userService = userService
    this.initDate()
    this.initAreaChart()
  }

  ngOnInit() {
    this.userService.getProfile()
    .map((response) => response.json())
    .subscribe(response => {
      if (typeof response.data.account.data.brands !== 'undefined') {
        this.metricsService.tvAudienceMetricsByBrandId(this.dateStart, this.dateEnd, response.data.account.data.brands[0].value)
        .map((response) => response.json())
        .map((response) => response.data)
        .subscribe(response => {
          this.digitalData = [
            {
            "name": response.brand.data.name,
            "series": [
              {
                'name': 'National: Live + Same Day',
                'value': response.audience.data.impressions_national_live
              },
              {
              'name': 'National: 3 Day Time-shifted (DVR or VOD)',
              'value': response.audience.data.impressions_national_c3
              },
              {
                'name': 'National: 4-7 Day Time-shifted (DVR)',
                'value': response.audience.data.impressions_national_c7
              },
              {
                'name': 'National 8+ Day Time-shifted (DVR)',
                'value': response.audience.data.impressions_national_c30
              },
              {
                'name': 'National: Other (Unsupported Networks)',
                'value': response.audience.data.impressions_unsupported
              },
              {
              'name': 'Local',
              'value': response.audience.data.impressions_local
              },
              {
              'name': 'VOD + OTT',
              'value': response.audience.data.impressions_vod
              },
            ]
            },
          ]
        })
      }
    })
  }
}
