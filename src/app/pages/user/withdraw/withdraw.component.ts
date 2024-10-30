import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-withdraw',
  standalone: true,
  imports: [TitleCasePipe,  FormsModule],
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.sass'
})
export class WithdrawComponent {
  exchangeName: string = '';  // Default value
  walletAddress: string = '';  // Default value
  amount: number | null = null;
}
