import { Injectable } from '@angular/core';
import { Auth, deleteUser, user, User } from '@angular/fire/auth';
import {
  collection,
  collectionData,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { BehaviorSubject, catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { LocalStorageService } from '../local-storage-service/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userRoleSubject = new BehaviorSubject<string | null>(null);

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private localStorageService: LocalStorageService
  ) {}

  getUserRole(): Observable<string | null> {
    return this.userRoleSubject.asObservable();
  }

  setUserRole(role: string | null) {
    this.userRoleSubject.next(role);
  }

  getCurrentUserId(): string | undefined {
    return this.localStorageService.getItem('user')?.uid;
  }

  getUserById(uid: string | undefined): Observable<DocumentData | undefined> {
    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('uid', '==', uid));
  
    // Use collectionData with the query to get real-time updates
    return collectionData(q, { idField: 'id' }).pipe(
      map((docs) => docs.length > 0 ? docs[0] : undefined), // pick the first document if found
      catchError(() => of(undefined)) // handle errors and emit undefined
    );
  }


  updateUserMainBalance(userId: string, balance: any): Observable<void> {
    console.log("update data: ", balance, userId);
    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('uid', '==', userId));

    return from(getDocs(q)).pipe(
      switchMap((snapshot) => {
        if (!snapshot.empty) {
          const userDoc = snapshot.docs[0];
          const userDocRef = doc(this.firestore, 'users', userDoc.id);
          return updateDoc(userDocRef, { 'balance.mainWallet': balance });
        } else {
          throw new Error('User not found');
        }
      }),
      catchError((error) => {
        console.error('Error updating main balance:', error);
        throw error;
      })
    );
  }

  updateUserProfitBalance(userId: string, balance: any): Observable<void> {
    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('uid', '==', userId));

    return from(getDocs(q)).pipe(
      switchMap((snapshot) => {
        if (!snapshot.empty) {
          const userDoc = snapshot.docs[0];
          const userDocRef = doc(this.firestore, 'users', userDoc.id);
          return updateDoc(userDocRef, { 'balance.profitWallet': balance });
        } else {
          throw new Error('User not found');
        }
      }),
      catchError((error) => {
        console.error('Error updating profit balance:', error);
        throw error;
      })
    );
  }


  getUsers(): Observable<DocumentData[]> {
    const usersCollection = collection(this.firestore, 'users');
    return from(getDocs(usersCollection)).pipe(
      map((snapshot) => {
        return snapshot.docs.map((doc) => doc.data() as DocumentData);
      })
    );
  }
}
