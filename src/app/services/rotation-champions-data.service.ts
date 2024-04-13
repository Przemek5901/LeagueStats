import { Injectable } from '@angular/core';
import { RotationKeysService } from './rotation-keys.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { ChampionList, ChampionsData } from '../search-page/rotation/rotation.interfaces';

@Injectable({
  providedIn: 'root',
})
export class RotationChampionsDataService {
  constructor(
    private rotationKeysService: RotationKeysService,
    private http: HttpClient
  ) {}

  getChampionsRotation(): Observable<any> {
    return this.rotationKeysService.getRotationKeys().pipe(
      switchMap((keys) => {
        return this.http
          .get<ChampionsData>(
            'https://ddragon.leagueoflegends.com/cdn/14.7.1/data/en_US/champion.json'
          )
          .pipe(
            map((championsData) => {
               return Object.values(championsData.data).filter(
                (champion) => keys.freeChampionIds.includes(+champion['key'])
              );
            })
          );
      })
    );
  }
}
