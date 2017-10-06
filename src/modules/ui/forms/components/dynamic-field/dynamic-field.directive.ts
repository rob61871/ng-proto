import {
  ComponentFactoryResolver,
  Directive,
  ComponentRef,
  Input,
  OnChanges,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core'
import { FormGroup } from '@angular/forms'

import { FormButtonComponent } from '../form-button/form-button.component'
import { FormInputComponent } from '../form-input/form-input.component'
import { FormSelectComponent } from '../form-select/form-select.component'

import { Field } from '../../models/field.interface'
import { FieldConfig } from '../../models/field-config.interface'

const components: {[type: string]: Type<Field>} = {
  button: FormButtonComponent,
  input: FormInputComponent,
  select: FormSelectComponent
}

@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements Field, OnChanges, OnInit {
  @Input()
  config: FieldConfig

  @Input()
  group: FormGroup

  component: ComponentRef<Field>

  constructor(
    protected resolver: ComponentFactoryResolver,
    protected container: ViewContainerRef
  ) {}

  ngOnChanges() {
  if (this.component) {
    this.component.instance.config = this.config
    this.component.instance.group = this.group
  }
}

  ngOnInit() {
    const component = components[this.config.type]
    const factory = this.resolver.resolveComponentFactory<any>(component)
    this.component = this.container.createComponent(factory)
    this.component.instance.config = this.config
    this.component.instance.group = this.group
  }
}
