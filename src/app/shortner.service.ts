import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { UserUrlDto } from './interface/user-url-dto';
import { UrlKey } from './interface/url-key';
import { UrlMapping } from './interface/url-mapping';

@Injectable({
  providedIn: 'root',
})
export class ShortnerService {
  readonly apiurl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  createUrlKey(userUrl: string): Observable<UrlMapping> {
    return this.http.post<UrlMapping>(`${this.apiurl}/shorten`, {
      url: userUrl,
    } as UserUrlDto);
  }

  getUrlKey(urlKey: string): Observable<UrlMapping> {
    return this.http.get<UrlMapping>(`${this.apiurl}/redirect-url/${urlKey}`);
  }
}
