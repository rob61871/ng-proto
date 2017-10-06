import { Component, OnInit } from '@angular/core'
import { MetricsService } from '../../../dashboard/services/metrics.service'
import { UserService } from '../../../../providers/user.service'
import { ErrorHandler } from '../../../../providers/error/handler'
import { DecimalPipe } from '@angular/common'

import * as flatten from 'flat'
import * as _ from 'lodash'
import * as moment from 'moment'

@Component({
  selector: 'app-spot-feed',
  templateUrl: './spot-feed.component.html',
  styleUrls: ['./spot-feed.component.css'],
  providers: [
    MetricsService,
    ErrorHandler,
    UserService,
  ],
})

export class SpotFeedComponent implements OnInit {
  protected erroHandler: ErrorHandler
  protected metricsService: MetricsService
  protected userService: UserService
  protected urlBase: string
  public dateStart: string
  public dateEnd: string
  public sortFilter: string
  public displaySortFilter: string
  public topSpotData: Array<any> = []

  initDate() {
    this.dateStart = moment().subtract(219, 'days').format('YYYY-MM-DD')
    this.dateEnd = moment().subtract(213, 'days').format('YYYY-MM-DD')
  }

  constructor(errorHandler: ErrorHandler, metricsService: MetricsService, userService: UserService) {
    this.metricsService = metricsService
    this.erroHandler = errorHandler
    this.userService = userService
    this.urlBase = 'https://d6u22qyv3ngwz.cloudfront.net/ad/'
    this.sortFilter = '-impressions'
    this.displaySortFilter = 'Impressions'
    this.initDate()
  }

  onSort(value) {
    console.log(value)
    // TO-DO: REFACTOR THE FOLLOWING CODE
    this.topSpotData = []
    if(value === 'Estimated Spend') {
      this.sortFilter = '-est_spend'
      this.displaySortFilter = 'Estimated Spend'
    } else if (value === 'Impressions') {
      this.sortFilter = '-impressions'
      this.displaySortFilter = 'Impressions'
    } else if (value === 'Total Airings') {
      this.sortFilter = '-airings'
      this.displaySortFilter = 'Total Airings'
    }
    // TO-DO: REFACTOR CODE ABOVE
    this.userService.getProfile()
    .map((response) => response.json())
    .subscribe(response => {
      if(!_.isEmpty(response.data.account.data.brands.data)) {
        this.metricsService.audienceMetricsForSpotsByBrand(this.dateStart, this.dateEnd, response.data.account.data.brands.data[1].id, this.sortFilter)
        .map((response) => response.json())
        .map((response) => response.data)
        .subscribe(response => {
          for (let i = 0; i<response.length; i++) {
            var spot = flatten(response[i])
            spot.image = this.urlBase + response[i].spot.data.hash + '/' + response[i].spot.data.slug + '-' + response[i].spot.data.thumb_id + '.jpg'

            this.topSpotData.push(spot)
          }
        })
      }
    })
  }

  ngOnInit() {
    this.userService.getProfile()
    .map((response) => response.json())
    .subscribe(response => {
      if(!_.isEmpty(response.data.account.data.brands.data)) {
        this.metricsService.audienceMetricsForSpotsByBrand(this.dateStart, this.dateEnd, response.data.account.data.brands.data[1].id, this.sortFilter)
        .map((response) => response.json())
        .map((response) => response.data)
        .subscribe(response => {
          for (let i = 0; i<response.length; i++) {
            var spot = flatten(response[i])
            spot.image = this.urlBase + response[i].spot.data.hash + '/' + response[i].spot.data.slug + '-' + response[i].spot.data.thumb_id + '.jpg'

            this.topSpotData.push(spot)
          }
          // console.log(this.topSpotData)
        })
      }
    })
  }
}
