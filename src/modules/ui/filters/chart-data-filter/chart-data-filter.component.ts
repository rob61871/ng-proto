import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component ({
  selector: 'app-chart-data-filter',
  templateUrl: './chart-data-filter.component.html',
  styleUrls: ['./chart-data-filter.component.css'],
})

export class ChartDataFilterComponent {
  @Output() clickChartData = new EventEmitter()

  protected formList: string[]
  protected selectedData: string
  protected dataSelected: string

  selectChangeHandler (event: any) {
    this.selectedData = event.target.value
    this.clickChartData.emit(event)
  }

  constructor() {
    this.formList = ['Impression Data', 'Demographic Data']
    this.dataSelected = this.formList[0]
  }

}
