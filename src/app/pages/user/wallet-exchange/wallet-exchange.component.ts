import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StepComponent } from '../../../components/step/step.component';

@Component({
  selector: 'app-wallet-exchange',
  standalone: true,
  imports: [StepComponent, TitleCasePipe,  FormsModule],
  templateUrl: './wallet-exchange.component.html',
  styleUrl: './wallet-exchange.component.sass'
})
export class WalletExchangeComponent {
  fromWallet: string = 'profit';  // Default value
  toWallet: string = 'main';  // Default value
  amount: number | null = null;

}
