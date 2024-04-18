import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, filter, map, switchMap, tap } from 'rxjs';
import {
  ChampionAbilities,
  ChampionList,
  ChampionsData,
} from '../search-page/rotation/rotation.interfaces';

interface ChampionData {
  puuid: string;
  championId: number;
  championLevel: number;
  championPoints: number;
  lastPlayTime: number;
  championPointsSinceLastLevel: number;
  championPointsUntilNextLevel: number;
  chestGranted: boolean;
  tokensEarned: number;
  summonerId: string;
}

export interface FavouriteChampion {
  id: string;
  name: string;
  chest: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FavouriteChampionsService {
  constructor(private http: HttpClient) {}

  getFavourtieChampionsKeys(): Observable<ChampionData[]> {
    return this.http
      .get<ChampionData[]>(
        `https://eun1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/z_4QhWWViJ0Gudj981cXywPvBPyh64UW3n2BxV0ZDOIUKB5mBiYck8I8xYmD5DN4GBcTBeh_PmWubw?api_key=${environment.apiKey}`
      )
      .pipe(
        map((championDataArray: ChampionData[]) => {
          return championDataArray.slice(0, 7).map((championData) => {
            return championData;
          });
        })
      );
  }



  getFavouriteChampionsData(): Observable<any[]> {
    return this.getFavourtieChampionsKeys().pipe(
      switchMap((championsWithMastery) => {
        return this.http
          .get<ChampionsData>(
            'https://ddragon.leagueoflegends.com/cdn/14.7.1/data/en_US/champion.json'
          )
          .pipe(
            map((allChampions) => {
              return championsWithMastery.map((championWithMastery) => {
                
                const matchingChampion: ChampionList = Object.values(allChampions.data).find(
                  (champion) =>
                    +champion['key'] === championWithMastery.championId
                );
                const filteredChampionData: FavouriteChampion = {
                  id: matchingChampion["id"].toString(),
                  name: matchingChampion["name"].toString(),
                  chest: championWithMastery.chestGranted
                };

                return filteredChampionData;
              });
            })
          );
      })
    );
  }


}
