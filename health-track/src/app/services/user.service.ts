import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}

  getUsers(): Observable<string[]> {
    return of(['John', 'Jane', 'Doe']);
  }

  addUser(user: string): Observable<string[]> {
    const users = ['John', 'Jane', 'Doe'];
    users.push(user);
    return of(users);
  }
}
