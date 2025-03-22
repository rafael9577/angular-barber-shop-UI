import { Component } from '@angular/core';
import { MatCard, MatCardTitle, MatCardHeader } from '@angular/material/card'


@Component({
  selector: 'app-card-header',
  imports: [MatCard, MatCardTitle, MatCardHeader],
  templateUrl: './card-header.component.html',
  styleUrl: './card-header.component.scss'
})
export class CardHeaderComponent {

}
