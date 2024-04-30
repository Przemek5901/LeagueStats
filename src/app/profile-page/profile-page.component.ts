import { Component, OnDestroy, OnInit } from '@angular/core';
import { FavouriteChampionsComponent } from './favourite-champions/favourite-champions.component';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { RanksComponent } from './ranks/ranks.component';
import { PlayerInfoComponent } from './player-info/player-info.component';
import { UserData } from '../search-page/search-page.interface';
import { MatchHistoryComponent } from './match-history/match-history.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    FavouriteChampionsComponent,
    RanksComponent,
    PlayerInfoComponent,
    MatchHistoryComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  summonerName: string;
  tagLine: string;
  server: string;
  userData: UserData;

  private readonly _destroying$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this._destroying$))
      .subscribe((params) => {
        this.summonerName = params['name'];
        this.tagLine = params['tag'];
        this.server = params['server'];
      });
    this.userDataService
      .getUserData(this.summonerName, this.server, this.tagLine)
      .pipe(takeUntil(this._destroying$))
      .subscribe((userData) => {
        this.userData = userData;
      });
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
