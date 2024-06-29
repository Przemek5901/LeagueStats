import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatchHistoryService } from '../../services/match-history.service';
import { UserDataService } from '../../services/user-data.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MatchData } from './match-data.interface';
import { CommonModule } from '@angular/common';
import { PlayersTableComponent } from './players-table/players-table.component';
import { PlayerMatchResultComponent } from './player-match-result/player-match-result.component';
import { PlayerMatchStatsComponent } from './player-match-stats/player-match-stats.component';

@Component({
  selector: 'app-match-history',
  standalone: true,
  imports: [
    CommonModule,
    PlayersTableComponent,
    PlayerMatchResultComponent,
    PlayerMatchStatsComponent,
  ],
  templateUrl: './match-history.component.html',
  styleUrl: './match-history.component.scss',
})
export class MatchHistoryComponent implements OnInit, OnDestroy {
  matchHistory$: Observable<MatchData[]>;
  userPUUiD$: Observable<string> = this.userDataService.currentUserPUUiD;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private matchHistoryService: MatchHistoryService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.userPUUiD$
      .pipe(takeUntil(this._destroying$))
      .subscribe(
        (userPUUiD) =>
          (this.matchHistory$ = this.matchHistoryService.getMatches(userPUUiD))
      );
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
