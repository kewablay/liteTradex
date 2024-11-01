import { Injectable } from '@angular/core';
import { Auth, user, User } from '@angular/fire/auth';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { BehaviorSubject, catchError, from, map, Observable, of } from 'rxjs';
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

  getUserById(uid: string | undefined): Observable<any | undefined> {
    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('uid', '==', uid));

    return from(getDocs(q)).pipe(
      map((snapshot) => {
        // Check if there's any data in the snapshot
        if (!snapshot.empty) {
          return snapshot.docs[0].data(); // Return the first matching user's data
        } else {
          throw new Error('User not found');
        }
      }),
      // Optional: handle any errors by returning an observable with undefined
      catchError(() => of(undefined))
    );
  }
  
}
