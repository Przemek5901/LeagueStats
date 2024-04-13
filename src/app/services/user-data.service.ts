import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { UserData } from '../search-page/search-page.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private http: HttpClient, private router: Router) {}

  getUserData(summonerName: string, server: string): Observable<UserData> {
    return this.http.get<UserData>(
      `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${environment.apiKey}`
    );
  }
}
