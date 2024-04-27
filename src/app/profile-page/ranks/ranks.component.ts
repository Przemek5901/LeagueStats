import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDataService } from '../../services/user-data.service';
import { CommonModule } from '@angular/common';
import { RanksService } from '../../services/ranks.service';
import { Rank } from './rank.interface';

@Component({
  selector: 'app-ranks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranks.component.html',
  styleUrl: './ranks.component.scss',
})
export class RanksComponent {
  user$: Observable<string> = this.userDataService.currentUserID;
  ranks: Rank[];

  constructor(
    private ranksService: RanksService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.user$.subscribe((userID) => {
      this.ranksService.getRanks(userID).subscribe((ranks) => {
        this.ranks = ranks;
      });
    });
  }

  calculateWinrate(wins: number, losess: number): number {
    const winratePercentage = (wins / (wins + losess)) * 100;
    const roundedWinrate = Math.floor(winratePercentage);

    return roundedWinrate;
  }
}
