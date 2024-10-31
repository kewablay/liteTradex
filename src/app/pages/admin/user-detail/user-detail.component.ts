import { Component } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { BalanceFormComponent } from "../../../components/balance-form/balance-form.component";

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CardComponent, ButtonModule, RouterLink, DialogModule, BalanceFormComponent],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.sass',
})
export class UserDetailComponent {
  visible: boolean = false;
  dialogType: string = '';

  constructor() {}

  handleEditMainWallet(): void {}

  handleEditProfitWallet(): void {}

  showDialog(type: string): void {
    this.dialogType = type;
    this.visible = true;
  }
  closeDialog(): void {
    this.visible = false;
  }
}
 