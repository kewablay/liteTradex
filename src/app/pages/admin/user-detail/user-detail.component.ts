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
import { Wallet } from '../../../models/app.model';
import { PersonalInfoComponent } from "../../../components/personal-info/personal-info.component";
import { ProgressSpinnerModule } from 'primeng/progressspinner';

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
    DatePipe,
    PersonalInfoComponent, 
    ProgressSpinnerModule
],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.sass',
})
export class UserDetailComponent {
  visible: boolean = false;
  dialogType: string = '';
  dialogBalance!: Wallet;
  user$!: Observable<DocumentData | undefined>;
  userId!: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const userId = params.get('id');
        this.userId = userId as string;
        return this.userService.getUserById(userId as string);
      })
    );
  }

  setDialogBalance(wallet: Wallet): void {
    this.dialogBalance = wallet;
  }

  showDialog(type: string, balanceWallet: Wallet): void {
    this.dialogType = type;
    this.setDialogBalance(balanceWallet);
    this.visible = true;
  }
  closeDialog(): void {
    this.visible = false;
  }
}
