import { Injectable } from "@angular/core";
// import { Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private HttpClient: HttpClient) { }

  getFilteredContentsTwitter(contentFilter: any, filterParam: any) {
    contentFilter.searchParam = JSON.stringify(filterParam);
    const data = contentFilter;
    var form_data = new FormData();
    for (var key in data) {
      form_data.append(key, data[key]);
    }
    return this.HttpClient.post("https://secure-hollows-83816.herokuapp.com/bca/getTwitterFeed/", form_data)
      .pipe(map((content) => { return content }));

    // return this.HttpClient.get("assets/data/tweet.json")
    //   .pipe(map((content) => { return content }));
  }

  getFilteredContentsNews(contentFilter: any, filterParam: any) {
    contentFilter.searchParam = JSON.stringify(filterParam);
    const data = contentFilter;
    var form_data = new FormData();
    for (var key in data) {
      form_data.append(key, data[key]);
    }
    return this.HttpClient.post("https://secure-hollows-83816.herokuapp.com/bca/getNewsFeed/", form_data)
      .pipe(map((content) => { return content }));
    // return this.HttpClient.get("assets/data/news.json")
    //   .pipe(map((content) => { return content }));
  }

  getFilteredContentsInstagram(contentFilter: any, filterParam: any) {
    contentFilter.searchParam = JSON.stringify(filterParam);
    const data = contentFilter;
    var form_data = new FormData();
    for (var key in data) {
      form_data.append(key, data[key]);
    }
    return this.HttpClient.post("https://secure-hollows-83816.herokuapp.com/bca/getInstagramTags/", form_data)
      .pipe(map((content) => { return content }));
    // return this.HttpClient.get("assets/data/instagram.json")
    //   .pipe(map((content) => { return content }));
  }


}
