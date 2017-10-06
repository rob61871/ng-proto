import { Injectable } from '@angular/core'
import {
  Http,
  Headers,
  RequestOptions,
  URLSearchParams,
  Request,
  Response
} from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { AuthenticateService } from './auth/authenticate.service'

@Injectable()
export class HttpService {
  protected baseUrl: string
  protected httpService: Http
  protected authService: AuthenticateService

  constructor(
    httpService: Http,
    authService: AuthenticateService,
  ) {
    this.baseUrl = 'http://bel-api-v4.ispot.tv/v4'
    this.httpService = httpService
    this.authService = authService
  }

  public get(uri: string, params?: URLSearchParams): Observable<Response> {
    return this.httpService.get(this.createEndpoint(uri), {
      headers: this.headers(),
      search: params,
    })
  }

  public post(uri: string, params?: URLSearchParams): Observable<Response> {
    return this.httpService.post(this.createEndpoint(uri), {
      headers: this.headers(),
      search: params,
    })
  }

  protected createEndpoint(uri: string): string {
    return this.baseUrl + uri
  }

  protected headers() {
    const headers = new Headers()
    const token   = this.authService.token()

    headers.append('Content-Type', 'application/json')

    if (token) {
      headers.append('Authorization', 'Bearer ' + token)
    }

    return headers
  }
}
