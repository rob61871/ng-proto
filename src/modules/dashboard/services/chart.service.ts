import { Injectable } from '@angular/core'

import { ColorScheme } from '../models/colorScheme.model'
import { COLORSCHEMES } from '../utils/color-sets'

@Injectable()
export class ChartDataService {

  constructor() { }

  getColorScheme() {
    return COLORSCHEMES
  }
}
