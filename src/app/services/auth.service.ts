import { Injectable } from '@angular/core';
import { LocalStoreService } from './local-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private ls: LocalStoreService) {}

  async registerUser(payload: any) {
    console.log('register', payload);
    this.ls.setItem('auth', payload);
    return true;
  }

  async loginUser(payload: any) {
    console.log('login', payload);
    try {
      const data = this.ls.getItem('auth');
      if (!data) {
        throw new Error('invalid user');
      }
      const { email, password } = payload;

      if (email !== data.email || password !== data.password)
        throw new Error('email or password is incorrect');

      return data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error?.message || 'payload is incorrect');
    }
  }

  async resetPassword(email: string) {
    console.log('resetPassword', email);
  }
  async getProfile() {
    console.log('getProfile');
    return this.ls.getItem('auth');
  }

  async signOut() {
    console.log('logout');
    this.ls.clear();
  }
  async AuthLogin(_provider: any) {
    console.log('authLogin');
  }

  async signInWithPhoneNumber(phoneNumber: string) {
    console.log('phoneNumber');
  }
}
