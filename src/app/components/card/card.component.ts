import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Wallet } from '../../models/app.model';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-card',
standalone: true,
  imports: [ButtonModule, DecimalPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass',
})
export class CardComponent {
  @Input() isAdminCard: boolean = false;
  @Input() balance!: Wallet;
  @Input() cardTitle!: string;

  @Output() onEdit = new EventEmitter<void>();

  handleEdit(): void {
    this.onEdit.emit();
  }
}
