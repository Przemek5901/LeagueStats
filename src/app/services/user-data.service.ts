import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

export interface UserData{ 
    id: string,
    accountId: string,
    puuid: string,
    name: string,
    profileIconId: number,
    revisionDate: number,
    summonerLevel: number
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http:HttpClient,
              private router:Router
   ) { }

  getUserData(summonerName:string, server:string){
    return this.http.get<UserData>(`https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${environment.apiKey}`).subscribe(
      userData=>{
        console.log(userData)
        this.router.navigate(['./profile' , userData.accountId])
      }
    )
  }

}
