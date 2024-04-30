import { Component, OnInit } from '@angular/core';
import { MatchHistoryService } from '../../services/match-history.service';

@Component({
  selector: 'app-match-history',
  standalone: true,
  imports: [],
  templateUrl: './match-history.component.html',
  styleUrl: './match-history.component.scss',
})
export class MatchHistoryComponent implements OnInit {
  constructor(private matchHistoryService: MatchHistoryService) {}

  ngOnInit(): void {
    this.matchHistoryService.getMatches().subscribe((res) => {
      console.log(res);
      // res.info.map((r) => {
      //   r.championName;
      // });
    });
  }
}
