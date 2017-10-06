import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'

import { Field } from '../../models/field.interface'
import { FieldConfig } from '../../models/field-config.interface'

@Component ({
  selector: 'form-button',
  styleUrls: ['form-button.component.css'],
  template: `
    <div
      class="dynamic-field form-button"
      [formGroup]="group">
      <button
      class="btn btn-secondary"
      type="submit">
        {{ config.label }}
      </button>
    </div>
    `
})
export class FormButtonComponent implements Field {
  config: FieldConfig
  group: FormGroup
}
