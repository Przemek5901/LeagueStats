import { Component, OnInit, Testability } from '@angular/core';
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

  ngOnInit(): void {
    this.currentRotation = this.rotationChampsDataServ.getChampionsRotation();
  }
}
