import { Component, Input } from '@angular/core';
import { MatchData } from '../match-data.interface';

@Component({
  selector: 'app-player-match-stats',
  standalone: true,
  imports: [],
  templateUrl: './player-match-stats.component.html',
  styleUrl: './player-match-stats.component.scss',
})
export class PlayerMatchStatsComponent {
  @Input() match: MatchData;

  getMultipleKills() {
    if (this.match.searchedPlayer.pentaKills !== 0) {
      return 'PENTAKILL!';
    } else if (this.match.searchedPlayer.quadraKills !== 0) {
      return 'QUADRAKILL';
    } else if (this.match.searchedPlayer.tripleKills !== 0) {
      return 'TRIPLEKILL';
    } else if (this.match.searchedPlayer.doubleKills !== 0) {
      return 'DOUBLEKILL';
    }
    return 'PENTAKILL!';
  }
}
