import { Injectable } from "@angular/core";
import { Response } from '@angular/http';
import { map,catchError } from 'rxjs/operators';
import { HttpClient } from "../shared/service/httpclient.service";


@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private httpclient: HttpClient) { }


  getFilteredContents(contentFilter: any) {
    const data = {
      channelType: 'twitter',
      resultType: 'popular',
      searchParam: { "allOfThese": ["virat", "kohli"], "atLeastOnce": ["cricket", "india"], "noneOfThese": [] },
      exclude: ""
    }
    return this.httpclient.post("https://secure-hollows-83816.herokuapp.com/bca/getTwitterFeed/", data)
      .pipe(map((response: any) => response.json()));
  }
}
