import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { BrowserModule } from '@angular/platform-browser'

import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive'
import { DynamicFormComponent } from './containers/dynamic-form/dynamic-form.component'
import { FormInputComponent } from './components/form-input/form-input.component'
import { FormSelectComponent } from './components/form-select/form-select.component'
import { FormButtonComponent } from './components/form-button/form-button.component'

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DynamicFieldDirective,
    DynamicFormComponent,
    FormInputComponent,
    FormSelectComponent,
    FormButtonComponent,
  ],
  exports: [
    DynamicFormComponent
  ],
  entryComponents: [
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent
  ]
})
export class DynamicFormsModule { }
