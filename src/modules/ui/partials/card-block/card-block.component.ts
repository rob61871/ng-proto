import { Component } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-card-block',
  templateUrl: 'card-block.component.html',
  styleUrls: ['card-block.component.css'],
  providers: [],
})

export class CardBlockComponent {
  public loading = false

  constructor() { }
}
