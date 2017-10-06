import { Component, OnInit } from '@angular/core'

import { MetricsService } from '../../../dashboard/services/metrics.service'
import { ChartDataService } from '../../../dashboard/services/chart.service'
import { UserService } from '../../../../providers/user.service'
import { ErrorHandler } from '../../../../providers/error/handler'
import { ColorScheme } from '../../../dashboard/models/colorScheme.model'
import { COLORSCHEMES } from '../../../dashboard/utils/color-sets'
import { ChartDataFilterComponent } from '../../filters/chart-data-filter/chart-data-filter.component'
import { ChartTypeFilterComponent } from '../../filters/chart-type-filter/chart-type-filter.component'

import * as moment from 'moment'

@Component({
  selector: 'app-master-chart',
  templateUrl: 'master-chart.component.html',
})
export class MasterChartComponent implements OnInit {
  // services
  protected metricsService: MetricsService
  protected chartDataService: ChartDataService
  protected erroHandler: ErrorHandler
  protected userService: UserService

  // general properties
  public dateStart: string
  public dateEnd: string
  protected impressionData: any[]
  protected audienceDemographics: any[]
  protected selectedData: string
  public loading = false
  protected clickSender: any
  public viewRatesData: any
  protected chartTypeFilter = 'donut'
  protected heading = 'View as Pie Chart'

  // common chart properties
  protected view: any[]
  protected results: any
  protected showXAxis: boolean
  protected showYAxis: boolean
  protected gradient: boolean
  protected showLegend: boolean
  protected showXAxisLabel: boolean
  protected showYAxisLabel: boolean
  protected yAxisLabel: string
  protected xAxisLabel: string
  protected showLabels: boolean
  protected chartColors: any
  protected colorScheme: any

  // bar chart specific properties

  // donut chart specific properties
  protected explodeSlices: boolean
  protected doughnut: boolean
  protected arcWidth: number

  toggleChartData (event) {
    this.selectedData = event.target.value
    if (this.selectedData === 'Impression Data') {
      this.results = this.impressionData
    } else if (this.selectedData === 'Demographic Data') {
      this.results = this.audienceDemographics
    }
    console.log(this.results)
    return this.results
  }

  toggleChartType (event) {
    this.heading = this.chartTypeFilter
    this.chartTypeFilter = event.target.innerText
    if (this.chartTypeFilter === ' View as Bar Chart') {
      console.log(this.chartTypeFilter)
      this.heading = this.chartTypeFilter
      this.chartTypeFilter = 'bar'
    } else if (this.chartTypeFilter === ' View as Pie Chart') {
      this.heading = this.chartTypeFilter
      console.log(this.chartTypeFilter)
      this.chartTypeFilter = 'donut'
    }
  }

  initDate() {
    this.dateStart = moment().subtract(219, 'days').format('YYYY-MM-DD')
    this.dateEnd = moment().subtract(213, 'days').format('YYYY-MM-DD')
  }

  initBarChart() {
    this.showXAxis = true
    this.showYAxis = true
    this.gradient = false
    this.showLegend = true
    this.showXAxisLabel = true
    this.showYAxisLabel = true
    this.yAxisLabel = 'Rates'
    this.xAxisLabel = 'View Types'
    this.colorScheme = []
    this.chartColors = this.chartDataService.getColorScheme()
    this.colorScheme = this.chartColors[0]
    this.results = []
  }

  initDonutChart() {
    this.showLegend = true
    this.showLabels = false
    this.explodeSlices = false
    this.doughnut = true
    this.arcWidth = 0.46
    this.colorScheme = []
    this.chartColors = this.chartDataService.getColorScheme()
    this.colorScheme = this.chartColors[0]
    this.results = []
  }

  constructor(errorHandler: ErrorHandler, metricsService: MetricsService, userService: UserService, chartDataService: ChartDataService) {
    this.metricsService = metricsService
    this.erroHandler = errorHandler
    this.userService = userService
    this.chartDataService = chartDataService
    this.initDate()
    this.initBarChart()
    this.initDonutChart()
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
          this.impressionData = [
            {
              'name': 'National: Live + Same Day',
              'value': response.audience.data.impressions_local
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
              'value': response.audience.data.impressions_national_live
            },
            {
              'name': 'VOD + OTT',
              'value': response.audience.data.impressions_vod
            },
          ]
          this.results = this.impressionData
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

  getViewRatesData() {
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
  }
