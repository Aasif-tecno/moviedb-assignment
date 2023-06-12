import { inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { of } from 'rxjs';
import { User } from '../../shared/interfaces/user';

export const LOCAL_STORAGE = new InjectionToken<Storage>(
  'window local storage object',
  {
    providedIn: 'root',
    factory: () => {
      return inject(PLATFORM_ID) === 'browser'
        ? window.localStorage
        : ({} as Storage);
    },
  }
);

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storage = inject(LOCAL_STORAGE);

  constructor() {
    const userList = this.storage.getItem('userList');
    if (!userList) {
      this.storage.setItem(
        'userList',
        JSON.stringify([
          {
            nae: 'Developer',
            email: 'developer@yopmail.com',
            password: '123456',
          },
        ])
      );
    }
  }

  getLoggedUser() {
    const user = this.storage.getItem('loggedUser');
    return user ? (JSON.parse(user) as User) : ({} as User);
  }

  get authenticated() {
    return this.storage.getItem('authenticated') ? true : false;
  }
  set authenticated(value: boolean) {
    this.storage.setItem('authenticated', JSON.stringify(value));
  }
  logInUser(user: User) {
    this.storage.setItem('loggedUser', JSON.stringify(user));
    return user;
  }
  getUser() {
    const userList = this.storage.getItem('userList');
    return of(userList ? (JSON.parse(userList) as User[]) : []);
  }

  removeUser() {
    this.storage.removeItem('loggedUser');
    this.storage.removeItem('authenticated');
  }

  addUser(user: any) {
    let userList = this.storage.getItem('userList');
    userList = userList ? JSON.parse(userList) : [];
    const data = userList && userList.length ? [...userList, user] : [user];
    console.log('UserLst', userList);
    this.storage.setItem('userList', JSON.stringify(data));
    return of(user);
  }
}
