import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpHeaders = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

const query = {
  query: 'Common Carbon Round'
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private _http: HttpClient
  ) { }

  fetchNews() {
    return this._http.post("https://eymarketintelapi.eu-gb.mybluemix.net/news", query, httpHeaders);
  }
}
