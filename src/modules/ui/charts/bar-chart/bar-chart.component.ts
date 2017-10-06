import {
  Component,
  Input,
  OnInit
} from '@angular/core'

import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms'

import { DecimalPipe } from '@angular/common'

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
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
  providers: [
    MetricsService,
    ChartDataService,
    ErrorHandler,
    UserService,
  ],
})

export class BarChartComponent implements OnInit {
  protected metricsService: MetricsService
  protected chartDataService: ChartDataService
  protected erroHandler: ErrorHandler
  protected userService: UserService
  protected view: any[]
  protected showXAxis: boolean
  protected showYAxis: boolean
  protected gradient: boolean
  protected showLegend: boolean
  protected showXAxisLabel: boolean
  protected showYAxisLabel: boolean
  protected yAxisLabel: string
  protected xAxisLabel: string
  protected chartColors: any
  protected colorScheme: any
  public dateStart: string
  public dateEnd: string
  protected impressionData: any[]
  protected audienceDemographics: any[]
  protected results: any
  protected selectedData: string
  public loading = false
  protected clickSender: any
  protected chartTypeFilter: any
  protected heading = 'View as Bar Chart'

  toggleChartData ($event) {
    this.selectedData = $event.target.value
    if (this.selectedData === 'Impression Data') {
      this.results = this.impressionData
    } else if (this.selectedData === 'Demographic Data') {
      this.results = this.audienceDemographics
    }
    console.log(this.results)
    return this.results
  }

  toggleChartType (event) {
    this.heading = 'bar'
    this.chartTypeFilter = event.target.innerText
    console.log(this.chartTypeFilter)
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

  constructor(errorHandler: ErrorHandler, metricsService: MetricsService, userService: UserService, chartDataService: ChartDataService) {
    this.metricsService = metricsService
    this.erroHandler = errorHandler
    this.userService = userService
    this.chartDataService = chartDataService
    this.initDate()
    this.initBarChart()
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
}
