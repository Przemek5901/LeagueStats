import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Rank } from '../profile-page/ranks/rank.interface';

@Injectable({
  providedIn: 'root',
})
export class RanksService {
  constructor(private http: HttpClient) {}

  getRanks(userID: string): Observable<Rank[]> {
    return this.http.get<Rank[]>(
      `https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/${userID}?api_key=${environment.apiKey}`
    );
  }
}
