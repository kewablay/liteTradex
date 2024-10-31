import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { BehaviorSubject, from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userRoleSubject = new BehaviorSubject<string | null>(null);

  constructor(private firestore: Firestore) {}

  getUserRole(): Observable<string | null> {
    return this.userRoleSubject.asObservable();
  }

  setUserRole(role: string | null) {
    this.userRoleSubject.next(role);
  }

  async getUserById(uid: string | undefined) {
    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('uid', '==', uid));

    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs[0].data(); // return the first matching user's data
    } else {
      throw new Error('User not found');
    }
  }
}
