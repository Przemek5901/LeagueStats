import { Component, OnInit } from '@angular/core';
import { FavouriteChampionsComponent } from './favourite-champions/favourite-champions.component';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { Observable } from 'rxjs';
import { RanksComponent } from './ranks/ranks.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [FavouriteChampionsComponent, RanksComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  profileName: string;
  constructor(private route: ActivatedRoute,
              private userDataService:UserDataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.profileName = params.get('summonerName');
    });
    this.userDataService.getUserData(this.profileName, "EUN1").subscribe();
  }
}
