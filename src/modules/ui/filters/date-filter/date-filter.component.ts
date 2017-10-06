import { Component } from '@angular/core'

@Component({
  selector: 'app-date-filter',
  templateUrl: 'date-filter.component.html',
  styleUrls: ['date-filter.component.css'],
  providers: [],
})

export class DateFilterComponent {
  public filterForm = null
  public customForm = null
  constructor() { }

  showFilter() {
    this.filterForm == null ? this.filterForm = true : this.filterForm = null
  }

  showCustom() {
    this.customForm == null ? this.customForm = true: this.customForm = null
  }

  applyFilters(data) {
    console.log(data)
  }

  ngOnInit() { }
}
