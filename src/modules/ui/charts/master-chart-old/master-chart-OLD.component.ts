import { Component, Input, OnInit } from '@angular/core'
import { MetricsService } from '../../../dashboard/services/metrics.service'
import { ChartDataService } from '../../../dashboard/services/chart.service'
import { ErrorHandler } from '../../../../providers/error/handler'
import { UserService } from '../../../../providers/user.service'
import { ColorScheme } from '../../../dashboard/models/colorScheme.model'
import { COLORSCHEMES } from '../../../dashboard/utils/color-sets'
import { ChartDataFilterComponent } from '../../filters/chart-data-filter/chart-data-filter.component'

import * as moment from 'moment'

@Component({
  selector: 'app-master-chart',
  templateUrl: './master-chart.component.html',
  styleUrls: ['./master-chart.component.css'],
  providers: [
    MetricsService,
    ChartDataService,
    ErrorHandler,
    UserService,
  ],
})

export class MasterChartComponent implements OnInit {
  protected metricsService: MetricsService
  protected chartDataService: ChartDataService
  protected erroHandler: ErrorHandler
  protected userService: UserService
  protected view: any[]
  protected showLegend: boolean
  protected showLabels: boolean
  protected explodeSlices: boolean
  protected doughnut: boolean
  protected name: any
  protected colorScheme: any
  protected arcWidth: number
  protected chartColors: any
  public dateStart: string
  public dateEnd: string
  public viewRatesData: any
  protected audienceDemographics: any[]
  protected results: any
  protected selectedData: string
  protected chartTypeFilter = 'donut'
  public loading = false

  toggleChartData ($event) {
    this.selectedData = $event.target.value
    if (this.selectedData === 'Impression Data') {
      this.results = this.viewRatesData
    } else if (this.selectedData === 'Demographic Data') {
      this.results = this.audienceDemographics
    }
    return this.results
  }

  toggleChartType ($event) {
    this.chartTypeFilter = $event.target.innerText
    console.log(this.chartTypeFilter)
    if (this.chartTypeFilter === ' View as Bar Chart') {
      console.log(this.chartTypeFilter)
      this.chartTypeFilter = 'bar'
    } else if (this.chartTypeFilter === ' View as Pie Chart') {
      console.log(this.chartTypeFilter)
      this.chartTypeFilter = 'donut'
    }
  }

  initDate() {
    this.dateStart = moment().subtract(219, 'days').format('YYYY-MM-DD')
    this.dateEnd = moment().subtract(213, 'days').format('YYYY-MM-DD')
  }
  //
  // initDonutChart() {
  //   this.results = []
  //   this.showLegend = true
  //   this.showLabels = false
  //   this.explodeSlices = false
  //   this.doughnut = true
  //   this.arcWidth = 0.46
  //   this.colorScheme = []
  //   this.chartColors = this.chartDataService.getColorScheme()
  //   this.colorScheme = this.chartColors[0]
  // }

  constructor(errorHandler: ErrorHandler, metricsService: MetricsService, userService: UserService, chartDataService: ChartDataService) {
    this.metricsService = metricsService
    this.erroHandler = errorHandler
    this.userService = userService
    this.chartDataService = chartDataService
    this.initDate()
    // this.initDonutChart()
    }

  ngOnInit() {
    this.getAudienceData()

    this.userService.getProfile()
    .map((response) => response.json())
    .subscribe(response => {
      if (typeof response.data.account.data.brands.data !== 'undefined') {
        this.loading = true
        this.metricsService.tvAudienceMetricsByBrandId(this.dateStart, this.dateEnd, response.data.account.data.brands.data[1].id)
        .map((response) => response.json())
        .map((response) => response.data)
        .subscribe(response => {
          this.loading = false
          this.viewRatesData = [
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
          this.results = this.viewRatesData
        })
      }
    })
  }

  getAudienceData() {
    this.userService.getProfile()
    .map((response) => response.json())
    .subscribe(response => {
      if (typeof response.data.account.data.brands.data !== 'undefined') {
        this.loading = true
        this.metricsService.tvAudienceMetricsByBrandId(this.dateStart, this.dateEnd, response.data.account.data.brands.data[1].id)
        .map((response) => response.json())
        .map((response) => response.data)
        .subscribe(response => {
          this.loading = false
          this.audienceDemographics = [
            {
              'name': 'Females Age 18-34',
              'value': response.audience.data.female_age_18_34_percent
            },
            {
              'name': 'Females Age 35-54',
              'value': response.audience.data.female_age_35_54_percent
            },
            {
              'name': 'Females Age 55+',
              'value': response.audience.data.female_age_55_plus_percent
            },
            {
              'name': 'Males Age 18-34',
              'value': response.audience.data.male_age_18_34_percent
            },
            {
              'name': 'Males Age 35-54',
              'value': response.audience.data.male_age_35_54_percent
            },
            {
              'name': 'Males Age 55+',
              'value': response.audience.data.male_age_55_plus_percent
            },
          ]
        })
      }
    })
  }
}
