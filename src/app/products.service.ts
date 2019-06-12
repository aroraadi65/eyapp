import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  })
};

const query = {
  query: "Common Carbon Round"
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  fetchPrices() {
    return this.http.post('https://eymarketintelapi.eu-gb.mybluemix.net/pricesbymaterial', query, httpOptions);
  }
}
