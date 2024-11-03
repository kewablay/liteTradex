import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.sass',
})
export class PersonalInfoComponent {
  @Input() user!: DocumentData | undefined;
}
