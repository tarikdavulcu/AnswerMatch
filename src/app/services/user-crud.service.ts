import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';



export class User {
  id: number;
  login: string;
  node_id: string;
  avatar_url: string;
  html_url: string;
}

export class Auth {
  UserName: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
// export class UserCrudService {

//   constructor() { }
// }
export class UserCrudService {

  endpoint = 'https://api.tarikdavulcu.com';
 
  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json','data':"{'username':'tarik', 'password':'2034','grant_type':'password','Authorization':'Basic'}" })
  // };

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','data':"{'username':"+"'tarik', 'password':'2034','grant_type':'password'}" })
  };

  constructor(private httpClient: HttpClient) { }

  createUser(user: User): Observable<any> {
    return this.httpClient.post<User>(this.endpoint, JSON.stringify(user))
      .pipe(
        catchError(this.handleError<User>('Error occured'))
      );
  }

  getToken(userName,password): Observable<User[]> {
    
    return this.httpClient.get<User[]>(this.endpoint + '/token' + userName)
      .pipe(
        tap(_ => console.log(`User fetched: ${userName}`)),
        catchError(this.handleError<User[]>(`Get user id=${userName}`))
      );
  }

  getcitlist(username:string,password:string): Observable<User> {
    return this.httpClient.get<User>(this.endpoint+"/city/getcitylist")
    // { headers: { 'Content-Type': 'application/json','Authorization':username+','+password } }
      .pipe(
        tap(users => console.log('Users retrieved!')),
        catchError(this.handleError<User>('Get user' ))
      );
  }

  updateUser(id, user: User): Observable<any> {
    return this.httpClient.put(this.endpoint + '/' + id, JSON.stringify(user))
      .pipe(
        tap(_ => console.log(`User updated: ${id}`)),
        catchError(this.handleError<User[]>('Update user'))
      );
  }

  deleteUser(id): Observable<User[]> {
    return this.httpClient.delete<User[]>(this.endpoint + '/' + id)
      .pipe(
        tap(_ => console.log(`User deleted: ${id}`)),
        catchError(this.handleError<User[]>('Delete user'))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }  
}