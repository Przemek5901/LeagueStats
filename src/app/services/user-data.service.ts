import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { UserById, UserData } from '../search-page/search-page.interface';
import { Observable, Subject, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userPUUiD: Subject<string> = new Subject<string>();
  private userID: Subject<string> = new Subject<string>();
  private userData: Subject<UserData> = new Subject<UserData>();

  constructor(private http: HttpClient) {}

  get currentUserPUUiD() {
    return this.userPUUiD.asObservable();
  }

  get currentUserID() {
    return this.userID.asObservable();
  }
  get currentUser() {
    return this.userData.asObservable();
  }

  getUserData(
    summonerName: string,
    server: string,
    tag: string
  ): Observable<UserData> {
    return this.http
      .get<UserById>(
        `https://${server}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tag}?api_key=${environment.apiKey}`
      )
      .pipe(
        switchMap((UserData) => {
          return this.http
            .get<UserData>(
              `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${UserData.puuid}?api_key=${environment.apiKey}`
            )
            .pipe(
              tap((userData) => {
                this.userData.next(userData);
                this.userPUUiD.next(userData.puuid);
                this.userID.next(userData.id);
              })
            );
        })
      );
  }
}
