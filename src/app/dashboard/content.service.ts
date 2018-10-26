import { Injectable } from "@angular/core";
// import { Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private HttpClient: HttpClient) { }


  storeRecipes() {
    // const headers = new HttpHeaders().set('Authorization', 'Bearer afdklasflaldf');

    // return this.httpClient.put('https://ng-recipe-book-3adbb.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
    //   observe: 'body',
    //   params: new HttpParams().set('auth', token)
    //   // headers: headers
    // });
    // const req = new HttpRequest('POST', 'https://ng-recipe-book-3adbb.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {reportProgress: true});
    // return this.httpClient.request(req);
  }


  getFilteredContents(contentFilter: any) {
    const data = {
      "channelType": "twitter",
      "resultType": "popular",
      "searchParam": JSON.stringify({
        "allOfThese": [
          "virat",
          "kohli"
        ],
        "atLeastOnce": [
          "cricket",
          "india"
        ],
        "noneOfThese": []
      }),
      "exclude": ""
    }

    var form_data = new FormData();

    for (var key in data) {
      form_data.append(key, data[key]);
    }
    console.log(form_data)
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
    return this.HttpClient.post("https://secure-hollows-83816.herokuapp.com/bca/getTwitterFeed/", form_data)
      .pipe(map((content) => { return content }));
  }
}
