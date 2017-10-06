import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'

import { FieldConfig } from '../../ui/forms/models/field-config.interface'
import { DynamicFormComponent } from './containers/dynamic-form/dynamic-form.component'

@Component({
  selector: 'app-test',
  template: `
    <div>
    <app-dynamic-form
      [config]="config"
      (change)="submit($event)">
    </app-dynamic-form>
    </div>
  `
})

export class TestComponent implements OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent

  protected config: FieldConfig[] = [
    {
      type: 'select',
      label: '',
      name: 'chartType',
      options: ['Display as Bar Chart', 'Display as Donut Chart'],
      placeholder: 'more'
    }
  ]

  ngAfterViewInit() {
  let previousValid = this.form.valid
  this.form.changes.subscribe(() => {
    if (this.form.valid !== previousValid) {
      previousValid = this.form.valid
      this.form.setDisabled('submit', !previousValid)
    }
  })
    // this.form.setDisabled('submit', true)
    // this.form.setValue('name', 'Full Name')
  }

  submit(value: {[name: string]: any}) {
    let temp = []
    for (let i = 0; i < this.config.length; i++) {
      temp.push(this.form.value)
      console.log(JSON.stringify(this.form.value))
      console.log(temp)
    }
  }

  // submit(value: {[name: string]: any}) {
  //   if (this.chartTypeForm.name === 'Display as Bar Chart') {
  //     this.chartTypeFilter = 'bar'
  //   }
  //   console.log(value)
  // }

  ngOnInit() { }

}
