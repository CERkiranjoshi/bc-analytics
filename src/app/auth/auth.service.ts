import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

@Injectable()
export class AuthService {

  constructor() {
  }

  signinUser(username: string, password: string) {
    const headers = new Headers();
    const authorization = 'Basic ' + btoa(username + ':' + password);
    sessionStorage.setItem('authorization', authorization);
  }

  signOut() {
    sessionStorage.clear();
  }
  isAuthenticated() {
    const authorization = sessionStorage.getItem('authorization');
    if (authorization != null) {
      return true;
    }else {
      return false;
    }
  }
}
