import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu-bar',
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent {

   constructor(private readonly router: Router) {

   }

   navigateTo(path: string) {
      this.router.navigate([path])
   }

}
