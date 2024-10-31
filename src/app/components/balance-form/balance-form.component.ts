import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-balance-form',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './balance-form.component.html',
  styleUrl: './balance-form.component.sass',
})
export class BalanceFormComponent {
  @Input() dialogType!: string;
  @Output() onClose = new EventEmitter<void>();

  handleClose(): void {
    this.onClose.emit();
  }
}
