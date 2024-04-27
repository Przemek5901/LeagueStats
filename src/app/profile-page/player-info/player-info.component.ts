import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserData } from '../../search-page/search-page.interface';
import { UserDataService } from '../../services/user-data.service';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
import { FavouriteChampionsService } from '../../services/favourite-champions.service';
import {
  ChampionData,
  FavouriteChampion,
} from '../favourite-champions/favourite-champions.interface';

@Component({
  selector: 'app-player-info',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './player-info.component.html',
  styleUrl: './player-info.component.scss',
})
export class PlayerInfoComponent implements OnInit, OnDestroy {
  userData$: Observable<UserData> = this.userDataService.currentUser;
  favourtieChampions$: Observable<ChampionData[]>;
  userPUUiD$: Observable<string> = this.userDataService.currentUserPUUiD;
  summonerName: string;
  tag: string;

  private readonly _destroying$ = new Subject<void>();

  constructor(
    private userDataService: UserDataService,
    private favChampionsService: FavouriteChampionsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userPUUiD$
      .pipe(takeUntil(this._destroying$))
      .subscribe((userPUUiD) => {
        this.favourtieChampions$ =
          this.favChampionsService.getFavourtieChampionsKeys(userPUUiD);
      });

    this.route.queryParams.subscribe((params) => {
      this.summonerName = params['name'];
      this.tag = params['tag'];
    });
  }

  getBackgroundChampionImage(championId): string {
    return `url(https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${championId}/${championId}000.jpg`;
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
