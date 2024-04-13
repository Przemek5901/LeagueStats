import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

interface championRotationKeys {
  freeChampionIds: number[];
  freeChampionIdsForNewPlayers: number[];
  maxNewPlayerLevel: number;
}

@Injectable({
  providedIn: 'root'
})
export class RotationKeysService {
  constructor(private http: HttpClient) {}

  getRotationKeys() : Observable<championRotationKeys>{
    return this.http.get<championRotationKeys>(`https://eun1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${environment.apiKey}`);
  }
}
