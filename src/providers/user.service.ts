import { Injectable } from '@angular/core'
import { HttpService } from './http.service'
import { URLSearchParams } from '@angular/http'

@Injectable()
export class UserService {
  protected httpService: HttpService

  constructor(
    httpService: HttpService,
  ) {
    this.httpService = httpService
  }

  getProfile() {
    let params: URLSearchParams = new URLSearchParams

    params.set('include', 'account.brands')

    return this.httpService.get('/users/profile', params)
  }
}
