import { Component, Input } from '@angular/core';
import { MatchData } from '../match-data.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-players-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './players-table.component.html',
  styleUrl: './players-table.component.scss',
})
export class PlayersTableComponent {
  @Input() match: MatchData;
}
