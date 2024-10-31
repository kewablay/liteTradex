import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private router: Router
  ) {}

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  signUp(
    email: string,
    username: string,
    password: string,
    country: string,
    currency: string
  ) {
    const usersCollection = collection(this.firestore, 'users');
    const avatarUrl = `https://api.dicebear.com/9.x/thumbs/svg?seed=${username}&mouth=variant1,variant3,variant4,variant5,variant2`;

    return createUserWithEmailAndPassword(this.auth, email, password).then(
      (userCredentials) => {
        const userId = userCredentials.user.uid;
        return addDoc(usersCollection, {
          uid: userId,
          username,
          email,
          avatarUrl: avatarUrl,
          isAdmin: false,
          country,
          createdAt: new Date().toISOString(),
          balance: {
            mainWallet: {
              currency,
              amount: 0,
            },
            profitWallet: {
              currency,
              amount: 0,
            },
          },
        });
      }
    );
  }
}
