import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
// import 'rxjs/Rx';
// import 'rxjs/add/operator/toPromise';
import { map } from 'rxjs/operators';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class HttpClient {


  public organisationData = {
    url: "",
    organisation_key: "",
    uuid: "",
    analytics_viewid: "",
    currency: ""
  };

  public organisationConfig = {
    itemsPerPage: 25
  }

  constructor(private http: Http) {
    // const data = sessionStorage.getItem('organisationData');
    // if (data != null) {
    //   this.organisationData = JSON.parse(data);
    // } else {
    //   this.http.get('assets/data/organisation.json')
    //     .subscribe(
    //     (response: Response) => {
    //       this.organisationData = response.json();
    //     }
    //     );
    // }
  }

  createAuthorizationHeader(headers: Headers) {
    // const authorization = sessionStorage.getItem('authorization');
    // headers.append('Authorization', authorization);
  }

  get(url) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }

  getJSON(url) {
    return this.http.get(url);
  }

  post(url, data) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }

  upload(url, data) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }

  put(url, data) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    headers.set('Content-Type', undefined)
    return this.http.put(url, data, {
      headers: headers
    });
  }

  delete(url) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(url, {
      headers: headers
    });
  }

  handleError(error: any) {
    if (error instanceof Response) {
      return Observable.throw(error.json());
    } else {
      error.message = 'Internal server error'
    }
    return Observable.throw(error);
  }

  //https://gitlab.com/bijoucommerce/curator-angular/commit/1a8d98ff50a30f1f64b5a6bfed2a2b6709226432
}
