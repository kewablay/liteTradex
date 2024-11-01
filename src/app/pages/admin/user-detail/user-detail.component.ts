import { Component } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { BalanceFormComponent } from '../../../components/balance-form/balance-form.component';
import { DocumentData } from '@angular/fire/firestore';
import { Observable, switchMap } from 'rxjs';
import { UserService } from '../../../services/user-service/user.service';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CardComponent,
    ButtonModule,
    RouterLink,
    DialogModule,
    BalanceFormComponent,
    AsyncPipe,
    DatePipe
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.sass',
})
export class UserDetailComponent {
  visible: boolean = false;
  dialogType: string = '';
  user$!: Observable<DocumentData>;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.user$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const userId = params.get('id');
        return this.userService.getUserById(userId as string);
      })
    );
  }

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
