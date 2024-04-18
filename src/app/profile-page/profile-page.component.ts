import { Component, OnDestroy, OnInit } from '@angular/core';
import { FavouriteChampionsService } from '../services/favourite-champions.service';
import { FavouriteChampionsComponent } from './favourite-champions/favourite-champions.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [FavouriteChampionsComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  constructor(private FavChampionsService:FavouriteChampionsService) {
    
  }
  ngOnInit(): void {
    this.FavChampionsService.getFavourtieChampionsKeys().subscribe(
      res=> {
        console.log(res);
        // for(let r of res){
        //   console.log(r.championId);
        // }
      }
    )

    this.FavChampionsService.getFavouriteChampionsData().subscribe(
      res=> {
        console.log(res);
        // for(let r of res){
        //   console.log(r.championId);
        // }
      }
    )
   }
}
