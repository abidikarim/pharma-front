import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BtcService {
  private apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur';
  constructor(private http: HttpClient) { }


   getBtcRate(): Observable<number> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => 1 / res.bitcoin.eur),
      catchError(err => {
        console.error('Failed to fetch BTC rate', err);
        return of(0);
      })
    );
  }
}
