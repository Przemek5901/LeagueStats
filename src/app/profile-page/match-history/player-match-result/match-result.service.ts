import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SpellsData, Spell, Item, Rune } from './match-result-interface';

@Injectable({
  providedIn: 'root',
})
export class MatchResultService {
  constructor(private http: HttpClient) {}

  getSummonerSpellName(spellKey: number): Observable<string> {
    return this.http
      .get<SpellsData>(
        'https://ddragon.leagueoflegends.com/cdn/11.3.1/data/en_US/summoner.json'
      )
      .pipe(
        map((spells) => {
          const matchingSpell: Spell = Object.values(spells.data).find(
            (spell) => +spell['key'] === spellKey
          );
          return matchingSpell['id'];
        })
      );
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(
      'https://raw.githubusercontent.com/ngryman/lol-items/master/items.json'
    );
  }

  getStyles(): Observable<Rune[]> {
    return this.http.get<Rune[]>(
      'https://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/runesReforged.json'
    );
  }
}
