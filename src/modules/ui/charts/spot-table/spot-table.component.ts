import { Component, OnInit, Input } from '@angular/core'
import { MetricsService } from '../../../dashboard/services/metrics.service'
import { UserService } from '../../../../providers/user.service'
import { ErrorHandler } from '../../../../providers/error/handler'
import { LocalDataSource } from 'ng2-smart-table'

import * as flatten from 'flat'
import * as _ from 'lodash'
import * as moment from 'moment'

@Component({
  selector: 'app-spot-table',
  templateUrl: './spot-table.component.html',
  styleUrls: ['./spot-table.component.css'],
  providers: [
    MetricsService,
    ErrorHandler,
    UserService,
  ],
})
export class SpotTableComponent implements OnInit {
  @Input() set newDates(newDates: any) {
    this.change(newDates)
  }
  protected metricsService: MetricsService
  protected erroHandler: ErrorHandler
  protected userService: UserService
  public dateStart: string
  public dateEnd: string
  public topSpotData: Array<any> = []
  public settings: Object
  public source: LocalDataSource
  public urlBase: string

  initDate() {
    this.dateStart = moment().subtract(219, 'days').format('YYYY-MM-DD')
    this.dateEnd = moment().subtract(213, 'days').format('YYYY-MM-DD')
  }

  change(newDates) {
    if(!_.some(newDates, _.isEmpty)) {
      this.topSpotData = []
      this.userService.getProfile()
      .map((response) => response.json())
      .subscribe(response => {
      //TO-DO: FIND SOLUTION TO VALIDATING DATA ONCE PROFILE HAS A PRIMARY BRAND ASSOCIATION//
        if(!_.isEmpty(response.data.account.data.brands.data)) {
          this.metricsService.audienceMetricsForSpotsByBrand(newDates.newStartDate, newDates.newEndDate, response.data.account.data.brands.data[1].id, '-impressions')
          .map((response) => response.json())
          .map((response) => response.data)
          .subscribe(response => {
            for(let i=0; i<response.length; i++) {

              var spot = flatten(response[i])
              spot.image = "<img class='spotImage' src='" + this.urlBase + response[i].spot.data.hash + '/' + response[i].spot.data.slug + '-' + response[i].spot.data.thumb_id + '.jpg' + "'>"
              this.topSpotData.push(spot)
            }
            this.source.load(this.topSpotData)
          })
        }
      })
    }
  }

  constructor(errorHandler: ErrorHandler, metricsService: MetricsService, userService: UserService) {
    this.metricsService = metricsService
    this.erroHandler = errorHandler
    this.userService = userService
    this.source = new LocalDataSource()
    this.initDate()
    this.urlBase = 'https://d6u22qyv3ngwz.cloudfront.net/ad/'
    this.settings = {
      mode: 'external',
      sort: true,
      hideSubHeader: true,
      editable: false,
      actions: {
        edit: false,
        add: false,
        delete: false,
      },
      columns: {
        'image': {
          title: 'Spots',
          type: 'html',
          valuePrepareFunction: (image) => {
            return image }
        },
        'spot.data.title_short': {
          title: 'Title'
        },
        'spot.data.description': {
          title: 'Description'
        },
        'airings.data.spend_estimated': {
          title: 'Spend Est.',
          valuePrepareFunction: (value) => {
            return value === 'Total'? value : Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(value)}
        },
        'audience.data.impressions': {
          title: 'Total Impressions',
          type: 'number',
          valuePrepareFunction: (value) => {
            return value ===  'Total'? value : Intl.NumberFormat('en-US', {style: 'decimal'}).format(value)}
        },
      }
    }
  }

  ngOnInit() {
    this.userService.getProfile()
    .map((response) => response.json())
    .subscribe(response => {
    //TO-DO: FIND SOLUTION TO VALIDATING DATA ONCE PROFILE HAS A PRIMARY BRAND ASSOCIATION//
      if(!_.isEmpty(response.data.account.data.brands.data)) {
        this.metricsService.audienceMetricsForSpotsByBrand(this.dateStart, this.dateEnd, response.data.account.data.brands.data[1].id, '-impressions')
        .map((response) => response.json())
        .map((response) => response.data)
        .subscribe(response => {
          for(let i=0; i<response.length; i++) {

            var spot = flatten(response[i])
            spot.image = "<img class='spotImage' src='" + this.urlBase + response[i].spot.data.hash + '/' + response[i].spot.data.slug + '-' + response[i].spot.data.thumb_id + '.jpg' + "'>"
            this.topSpotData.push(spot)
          }
          this.source.load(this.topSpotData)
        })
      }
    })
  }
}
