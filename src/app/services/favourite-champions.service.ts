import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, map, switchMap } from 'rxjs';
import {
  ChampionList,
  ChampionsData,
} from '../search-page/rotation/rotation.interfaces';
import { ChampionData, FavouriteChampion } from '../profile-page/favourite-champions/favourite-champions.interface';



@Injectable({
  providedIn: 'root',
})
export class FavouriteChampionsService {
  constructor(private http: HttpClient) {}

  getFavourtieChampionsKeys(userPUUiD:string): Observable<ChampionData[]> {
    return this.http
      .get<ChampionData[]>(
        `https://eun1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${userPUUiD}?api_key=${environment.apiKey}`
      )
      .pipe(
        map((championDataArray: ChampionData[]) => {
          return championDataArray.slice(0, 7).map((championData) => {
            return championData;
          });
        })
      );
  }



  getFavouriteChampionsData(userPUUiD:string): Observable<any[]> {
    return this.getFavourtieChampionsKeys(userPUUiD).pipe(
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
