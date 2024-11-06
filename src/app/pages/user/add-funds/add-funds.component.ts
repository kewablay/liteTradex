import { Component } from '@angular/core';
import { StepComponent } from "../../../components/step/step.component";
import { TitleCasePipe } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-add-funds',
  standalone: true,
  imports: [StepComponent, TitleCasePipe,  FormsModule],
  templateUrl: './add-funds.component.html',
  styleUrl: './add-funds.component.sass'
})
export class AddFundsComponent {
  paymentMethod: string = 'bank';  // Default value
  amount: number | null = null;
}
