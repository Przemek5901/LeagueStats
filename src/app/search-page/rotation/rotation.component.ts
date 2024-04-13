import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { RotationKeysService } from '../../services/rotation-keys.service';
import { RotationChampionsDataService } from '../../services/rotation-champions-data.service';
import { Observable } from 'rxjs';
import { ChampionList } from './rotation.interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rotation',
  standalone: true,
  imports: [CardModule, CommonModule],
  templateUrl: './rotation.component.html',
  styleUrl: './rotation.component.scss',
})
export class RotationComponent implements OnInit {
  constructor(private rotationChampsDataServ: RotationChampionsDataService) {}

  currentRotation: Observable<ChampionList[]>;
  images:any[];
  ngOnInit() {
    this.currentRotation = this.rotationChampsDataServ.getChampionsRotation();
  }
  name(input: string): string {
    // Usuń wszystkie znaki specjalne oprócz myślnika "-"
    const normalized = input.replace(/[^\w\s-]/gi, '').trim();
  
    // Podziel string na części po spacjach i myślnikach
    const parts = normalized.split(/\s+|-/);
  
    // Utwórz przekształconą nazwę
    let transformed = '';
  
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (part) {
        // Pierwszą literę każdej części zamień na wielką, a pozostałe na małe
        const formattedPart = part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
        transformed += formattedPart;
      }
    }
    console.log(transformed);
    return transformed;
  }
}
