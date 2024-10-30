import { Component } from '@angular/core';
import { CardComponent } from "../../../components/card/card.component";
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CardComponent, ButtonModule, RouterLink],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.sass'
})
export class UserDetailComponent {

}
