import {
  AfterContentInit,
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'

import { AreaChartComponent } from '../area-chart/area-chart.component'
import { BarChartComponent } from '../bar-chart/bar-chart.component'
import { DonutChartComponent } from '../donut-chart/donut-chart.component'
import { LineChartComponent } from '../line-chart/line-chart.component'

@Component({
  selector: 'app-dynamic-chart',
  templateUrl: './dynamic-chart.component.html',
  styleUrls: ['./dynamic-chart.component.css']
})

export class DynamicChartComponent implements AfterContentInit {

  @ViewChild('barBlock', { read: ViewContainerRef }) barBlock: ViewContainerRef

  @ViewChild('donutBlock', { read: ViewContainerRef }) donutBlock: ViewContainerRef

  constructor(private resolver: ComponentFactoryResolver) { }

  ngAfterContentInit() {
    const barChartFactory = this.resolver.resolveComponentFactory(BarChartComponent)
    const donutChartFactory = this.resolver.resolveComponentFactory(DonutChartComponent)
    const barChartComponent = this.barBlock.createComponent(barChartFactory)
    const donutChartComponent = this.donutBlock.createComponent(donutChartFactory)
  }

  }
