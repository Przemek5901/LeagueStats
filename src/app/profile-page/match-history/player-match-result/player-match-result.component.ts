import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatchData } from '../match-data.interface';
import { forkJoin, takeUntil, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatchResultService } from './match-result.service';
import { Item, Rune } from './match-result-interface';

@Component({
  selector: 'app-player-match-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-match-result.component.html',
  styleUrls: ['./player-match-result.component.scss'],
})
export class PlayerMatchResultComponent implements OnInit, OnDestroy {
  @Input() match: MatchData;

  summoner1: string;
  summoner2: string;
  items: Item[] = [];
  styles: Rune[] = [];

  private readonly _destroying$ = new Subject<void>();

  constructor(private matchResultService: MatchResultService) {}

  ngOnInit(): void {
    forkJoin({
      summoner1: this.matchResultService.getSummonerSpellName(
        this.match.searchedPlayer.summoner1Id
      ),
      summoner2: this.matchResultService.getSummonerSpellName(
        this.match.searchedPlayer.summoner2Id
      ),
      items: this.matchResultService.getItems(),
      styles: this.matchResultService.getStyles(),
    })
      .pipe(takeUntil(this._destroying$))
      .subscribe(({ summoner1, summoner2, items, styles }) => {
        this.summoner1 = summoner1;
        this.summoner2 = summoner2;
        this.items = items;
        this.styles = styles;
      });
  }

  calculateKDA(kills: number, deaths: number, assists: number) {
    return deaths > 0 ? ((kills + assists) / deaths).toFixed(2) : 'Perfect';
  }

  getItemImage(itemId: number): string {
    const item = this.items.find((item) => item.id === itemId.toString());
    return item?.icon || '';
  }

  getStylesImage(styleId: number): string {
    const style = this.styles.find((style) => style.id === styleId);
    return style
      ? `https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/${style.icon.toLowerCase()}`
      : '';
  }

  getSummonerSpell(spell: string): string {
    return `https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/${spell}.png`;
  }

  getBackgroundChampionImage(championName: string): string {
    return `url(https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/${championName}.png)`;
  }

  ngOnDestroy(): void {
    this._destroying$.next();
    this._destroying$.complete();
  }
}
