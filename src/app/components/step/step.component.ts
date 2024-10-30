import { Component, Input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [AvatarModule],
  templateUrl: './step.component.html',
  styleUrl: './step.component.sass',
})
export class StepComponent {
  @Input() step!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() accentColor!: string;
  @Input() active!: boolean;
}
