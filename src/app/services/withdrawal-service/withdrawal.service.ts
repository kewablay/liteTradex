import { Injectable, Query } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { query } from 'express';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WithdrawalService {
  constructor(private firestore: Firestore) {}

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

  // getWithdrawalsByUserId(userId: string): Observable<DocumentData[]> {
  //   const withdrawalCollection = collection(this.firestore, 'withdrawal');

  //   // Create a query to filter withdrawals by userId
  //     const q = query(withdrawalCollection, where('userId', '==', userId));

  //   // Use collectionData to listen to real-time updates for this specific user
  //   return collectionData(q, { idField: 'id' }) as Observable<DocumentData[]>;
  // }

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
