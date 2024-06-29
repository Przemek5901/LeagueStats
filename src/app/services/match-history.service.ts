import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import {
  MatchData,
  MatchDataDTO,
} from '../profile-page/match-history/match-data.interface';
import { mapMatchHistory } from '../profile-page/match-history/match-history.mapper';

@Injectable({
  providedIn: 'root',
})
export class MatchHistoryService {
  constructor(private http: HttpClient) {}

  getMatches(userPuuid: string): Observable<MatchData[]> {
    return this.http
      .get<string[]>(
        `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${userPuuid}/ids?start=0&count=20&api_key=${environment.apiKey}`
      )
      .pipe(
        switchMap((matches: string[]) =>
          forkJoin(
            matches.slice(0, 10).map((match) => this.getMatchData(match))
          )
        ),
        map((matchDataArray: MatchDataDTO[]) =>
          mapMatchHistory(matchDataArray, userPuuid)
        )
      );
  }

  getMatchData(match: string): Observable<MatchDataDTO> {
    return this.http.get<MatchDataDTO>(
      `https://europe.api.riotgames.com/lol/match/v5/matches/${match}?api_key=${environment.apiKey}`
    );
  }
}
