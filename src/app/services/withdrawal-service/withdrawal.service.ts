import { Injectable, Query } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  runTransaction,
  updateDoc,
  where as firestoreWhere,
} from '@angular/fire/firestore';
import { query } from 'express';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { UserService } from '../user-service/user.service';
import { parse } from 'path';
import { user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class WithdrawalService {
  constructor(private firestore: Firestore, private userService: UserService) {}

  createWithdrawal(withdrawal: DocumentData): Observable<any> {
    const postsCollection = collection(this.firestore, 'withdrawal');
    return from(addDoc(postsCollection, withdrawal));
  }

  getWithdrawals(): Observable<DocumentData[]> {
    const withdrawalCollection = collection(this.firestore, 'withdrawal');

    // Use collectionData to listen for real-time updates on the entire collection
    return collectionData(withdrawalCollection, {
      idField: 'id',
    }) as Observable<DocumentData[]>;
  }

  approveWithdrawal(
    withdrawalId: string,
    userId: string,
    amount: string
  ): Observable<void> {
    console.log('About to approve request: ', withdrawalId, userId, amount);
    const withdrawalDocRef = doc(this.firestore, 'withdrawal', withdrawalId);
    
    // First check if withdrawal exists and its status
    return from(getDoc(withdrawalDocRef)).pipe(
      switchMap((withdrawalDoc) => {
        if (!withdrawalDoc.exists()) {
          throw new Error('Withdrawal not found');
        }
  
        const withdrawalData = withdrawalDoc.data();
        if (withdrawalData['status'] === 'approved') {
          throw new Error('Withdrawal has already been approved');
        }
  
        // Continue with the existing approval flow
        return this.userService.getUserByIdOneTime(userId).pipe(
          switchMap((user) => {
            if (!user) {
              throw new Error('User not found');
            }
            const currentBalance =
              parseFloat(user['balance']['mainWallet']['amount']) ?? 0;
  
            // Calculate the new balance
            const newBalance = currentBalance - parseFloat(amount);
            if (newBalance < 0) throw new Error('Insufficient balance');
  
            // Step 1: Update withdrawal status to "approved"
            return from(updateDoc(withdrawalDocRef, { status: 'approved' })).pipe(
              // Step 2: Update user's balance in main wallet
              switchMap(() =>
                this.userService.updateUserMainBalance(userId, {
                  ...user['balance']['mainWallet'],
                  amount: newBalance,
                })
              )
            );
          }),
          map(() => {
            // Optionally: you could log or return something here if needed
          })
        );
      })
    );
  }

  getWithdrawalsByUserId(userId: string): Observable<DocumentData[]> {
    const withdrawalCollection = collection(this.firestore, 'withdrawal');

    // Use collectionData to listen to all documents and filter by userId
    return collectionData(withdrawalCollection, { idField: 'id' }).pipe(
      map((withdrawals) =>
        withdrawals.filter((withdrawal) => withdrawal['userId'] === userId)
      )
    ) as Observable<DocumentData[]>;
  }

  updateWithdrawalStatus(
    withdrawalId: string,
    status: string
  ): Observable<void> {
    const withdrawalDocRef = doc(this.firestore, 'withdrawal', withdrawalId);
    return from(updateDoc(withdrawalDocRef, { status: status }));
  }

  deleteWithdrawal(withdrawalId: string): Observable<void> {
    const withdrawalDocRef = doc(this.firestore, 'withdrawal', withdrawalId);
    return from(deleteDoc(withdrawalDocRef));
  }
}
