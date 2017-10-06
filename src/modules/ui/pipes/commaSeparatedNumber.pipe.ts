import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'CommaSeparatedNumber',
  pure: false,
})
export class CommaSeparatedNumberPipe implements PipeTransform {
  transform(value: string): any {
    let numberValue = parseFloat(value)

    return numberValue.toLocaleString('en')
  }
}
