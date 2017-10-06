import { Component, OnInit } from '@angular/core'
import { DecimalPipe } from '@angular/common'

import { UserService } from '../../../../providers/user.service'
import { MetricsService } from '../../services/metrics.service'
import { ErrorHandler } from '../../../../providers/error/handler'

import * as moment from 'moment'

@Component({
  selector: 'app-brand-page',
  templateUrl: 'brands.component.html',
  styleUrls: ['./brands.component.css'],
  providers: [
    MetricsService,
    ErrorHandler,
    UserService,
  ],
})

export class BrandsPageComponent implements OnInit {
  protected condition = true
  protected erroHandler: ErrorHandler
  protected metricsService: MetricsService
  protected userService: UserService
  public dateStart: string
  public dateEnd: string
  public displayStartDate: string
  public displayEndDate: string
  public _newDates: any
  public brandByIdData
  public audienceData
  public audienceDataByIndustry

  initDateArguments() {
    this.dateStart = moment().subtract(69, 'days').format('YYYY-MM-DD')
    this.dateEnd = moment().subtract(63, 'days').format('YYYY-MM-DD')
    this.displayStartDate = moment().subtract(69, 'days').format('MM-DD-YYYY')
    this.displayEndDate = moment().subtract(63, 'days').format('MM-DD-YYYY')
  }

  constructor(errorHandler: ErrorHandler, metricsService: MetricsService, userService: UserService) {
    this.erroHandler = errorHandler
    this.metricsService = metricsService
    this.userService = userService
    this.initDateArguments()
  }

  ngOnInit() {
    this.userService.getProfile()
    .map((response) => response.json())
    .subscribe(response => {
      if (typeof response.data.account.data.brands.data !== 'undefined') {
        this.metricsService.tvMetricsByBrandId(this.dateStart, this.dateEnd, response.data.account.data.brands.data[1].id)
        .map((response) => response.json())
        .map((response) => response.data)
        .subscribe(
          (response) => this.brandByIdData = response,
          (error) => {
            this.erroHandler.on(error)
          }
        )
      }
    }),
    this.userService.getProfile()
    .map((response) => response.json())
    .subscribe(response => {
      if (typeof response.data.account.data.brands.data !== 'undefined') {
        this.metricsService.tvAudienceByBrandId(this.dateStart, this.dateEnd, response.data.account.data.brands.data[1].id)
        .map((response) => response.json())
        .map((response) => response.data)
        .subscribe(
          (response) => this.audienceData = response,
          (error) => {
            this.erroHandler.on(error)
          }
        )
      }
    }),
    this.metricsService.tvAudienceByIndustryMetrics(this.dateStart, this.dateEnd)
    .map((response) => response.json())
    .map((response) => response.data)
    .subscribe(
      (response) => this.audienceDataByIndustry = response[0],
      (error) => {
        this.erroHandler.on(error)
    }),
    this.metricsService.tvAudienceByIndustryMetrics(this.dateStart, this.dateEnd)
    .map((response) => response.json())
    .map((response) => response.data)
    .subscribe(
      (response) => this.audienceDataByIndustry = response[0],
      (error) => {
        this.erroHandler.on(error)
      }
    )
  }
}
