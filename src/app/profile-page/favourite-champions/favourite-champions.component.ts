import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {  FavouriteChampion, FavouriteChampionsService } from '../../services/favourite-champions.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favourite-champions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favourite-champions.component.html',
  styleUrl: './favourite-champions.component.scss'
})
export class FavouriteChampionsComponent {
  favourtieChampions: Observable<FavouriteChampion[]>;
  
  constructor(private favChampionsService:FavouriteChampionsService) {}

  ngOnInit() :void{
   this.favourtieChampions = this.favChampionsService.getFavouriteChampionsData();
  }

}
