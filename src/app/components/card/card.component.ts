import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-card',
standalone: true,
  imports: [ButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass',
})
export class CardComponent {
  @Input() isAdminCard: boolean = false;
  @Input() balance!: string;
  @Input() cardTitle!: string;

  @Output() onEdit = new EventEmitter<void>();

  handleEdit(): void {
    this.onEdit.emit();
  }
}
