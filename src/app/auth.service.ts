import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('userToken') !== null) {
      this.decodeUserData()
    }
  }

  register(userData: object): Observable<any> {
    return this._HttpClient.post('https://route-ecommerce.onrender.com/api/v1/auth/signup', userData)

  }
  login(userData: object): Observable<any> {
    return this._HttpClient.post('https://route-ecommerce.onrender.com/api/v1/auth/signin', userData)

  }

  userData = new BehaviorSubject(null)
  decodeUserData() {
    let encodedData = JSON.stringify(localStorage.getItem('userToken'))
    let decodedData: any = jwtDecode(encodedData)
    this.userData.next(decodedData)
  }


  signOut() {
    localStorage.removeItem('userToken')
    this.userData.next(null)
    this._Router.navigate(['/login'])
  }

}
