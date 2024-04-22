import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { UserData } from '../search-page/search-page.interface';
import { BehaviorSubject, Observable, ReplaySubject, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private http: HttpClient) {}

  private userPUUiD: Subject<string> = new Subject<string>();

  get currentUserPUUiD() {
    return this.userPUUiD.asObservable();
  }

  private userID: Subject<string> = new Subject<string>();

  get currentUserID() {
    return this.userID.asObservable();
  }

  getUserData(summonerName: string, server: string): Observable<UserData> {
    return this.http
      .get<UserData>(
        `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${environment.apiKey}`
      )
      .pipe(
        tap((userData) => {
          this.userPUUiD.next(userData.puuid);
          this.userID.next(userData.id);
        })
      );
  }
}
