import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component ({
  selector: 'app-chart-type-filter',
  templateUrl: './chart-type-filter.component.html',
  styleUrls: ['./chart-type-filter.component.css'],
})

export class ChartTypeFilterComponent {
  @Output() clickChartType = new EventEmitter()

  protected selectedChartType: string

  getChartType (event: any) {
    this.selectedChartType = event.target.innerText
    this.clickChartType.emit(event)
    console.log(this.selectedChartType)
  }


}
