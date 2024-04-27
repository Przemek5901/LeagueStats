import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FavouriteChampionsService } from '../../services/favourite-champions.service';
import { CommonModule } from '@angular/common';
import { UserDataService } from '../../services/user-data.service';
import { FavouriteChampion } from './favourite-champions.interface';

@Component({
  selector: 'app-favourite-champions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favourite-champions.component.html',
  styleUrl: './favourite-champions.component.scss',
})
export class FavouriteChampionsComponent {
  favourtieChampions$: Observable<FavouriteChampion[]>;
  userPUUiD$: Observable<string> = this.userDataService.currentUserPUUiD;

  constructor(
    private favChampionsService: FavouriteChampionsService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.userPUUiD$.subscribe((userPUUiD) => {
      this.favourtieChampions$ =
        this.favChampionsService.getFavouriteChampionsData(userPUUiD);
    });
  }
}
