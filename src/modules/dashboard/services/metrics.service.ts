import { Injectable } from '@angular/core'

import { HttpService } from '../../../providers/http.service'

import { Observable } from 'rxjs/Observable'
import { Http, URLSearchParams, Response } from '@angular/http'
import 'rxjs/add/operator/map'

@Injectable()
export class MetricsService {
  protected httpService: HttpService

  constructor(httpService: HttpService) {
    this.httpService = httpService
  }

  tvMetricsByBrandId(start: string, end: string, id: string): Observable<Response> {
    let params: URLSearchParams = new URLSearchParams

    params.set('filter[start_date]', start)
    params.set('filter[end_date]', end)

    return this.httpService.get('/metrics/tv/brands/' + id, params)
  }

  tvAudienceByBrandId(start: string, end: string, id: string): Observable<Response> {
    let params: URLSearchParams = new URLSearchParams

    params.set('filter[start_date]', start)
    params.set('filter[end_date]', end)
    params.set('metrics[include_audience_attention]', '1')

    return this.httpService.get('/metrics/audience/brands/' + id, params)
  }

  digitalBrandByBrandId(start: string, end: string, id: string): Observable<Response> {
    let params: URLSearchParams = new URLSearchParams

    params.set('filter[start_date]', start)
    params.set('filter[end_date]', end)

    return this.httpService.get('/metrics/digital/brands/' + id, params)
  }

  tvAudienceMetricsByBrandId(start: string, end: string, id: string): Observable<Response> {
    let params: URLSearchParams = new URLSearchParams

    params.set('filter[start_date]', start)
    params.set('filter[end_date]', end)

    return this.httpService.get('/metrics/audience/brands/' + id, params)
  }

  digitalSpotsByBrandId(start: string, end: string, id: string): Observable<Response> {
    let params: URLSearchParams = new URLSearchParams

    params.set('filter[start_date]', start)
    params.set('filter[end_date]', end)

    return this.httpService.get('/metrics/digital/spots/' + id, params)
  }

  tvIndustryMetrics(start: string, end: string): Observable<Response> {
    let params: URLSearchParams = new URLSearchParams

    params.set('filter[start_date]', start)
    params.set('filter[end_date]', end)

    return this.httpService.get('/metrics/tv/industries', params)
  }

  tvSpots(start: string, end: string): Observable<Response> {
    let params: URLSearchParams = new URLSearchParams

    params.set('filter[start_date]', start)
    params.set('filter[end_date]', end)

    return this.httpService.get('/metrics/tv/spots', params)
  }

  digital(start: string, end: string, id: string): Observable<Response> {
    let params: URLSearchParams = new URLSearchParams

    params.set('filter[start_date]', start)
    params.set('filter[end_date]', end)

    return this.httpService.get('/metrics/digital' + id, params)
  }

  tvAudienceByIndustryMetrics(start: string, end: string): Observable<Response> {
    let params: URLSearchParams = new URLSearchParams

    params.set('filter[start_date]', start)
    params.set('filter[end_date]', end)
    params.set('metrics[include_audience_attention]', '1')

    return this.httpService.get('/metrics/audience/industries', params)
  }

  topSpotsByBrandId(start: string, end: string, brand: string, filter: string): Observable<Response> {
    let params: URLSearchParams = new URLSearchParams

    params.set('filter[start_date]', start)
    params.set('filter[end_date]', end)
    params.set('filter[brand]', brand)

    return this.httpService.get('/metrics/tv/spots', params)
  }

  audienceMetricsForSpotsByBrand(start: string, end: string, id: string, filter: string): Observable<Response> {
    let params: URLSearchParams = new URLSearchParams

    params.set('filter[start_date]', start)
    params.set('filter[end_date]', end)
    params.set('filter[brand]', id)
    params.set('sort', filter)

    return this.httpService.get('/metrics/audience/spots', params)
  }
}
