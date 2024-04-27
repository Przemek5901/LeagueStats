import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { UserDataService } from '../services/user-data.service';
import { Subscription } from 'rxjs';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { RotationComponent } from './rotation/rotation.component';
import { Router } from '@angular/router';
import { Region } from './region.interface';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    InputTextModule,
    InputGroupModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    AnimateOnScrollModule,
    RotationComponent,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent implements OnInit, OnDestroy {
  summonerName: string = '';
  tagLine: string = '';
  userDataSub: Subscription;

  regions: Region[] = [
    { name: 'AMERICAS', code: 'americas' },
    { name: 'EUROPE', code: 'europe' },
    { name: 'ASIA', code: 'asia' },
    { name: 'ESPORTS', code: 'esports' },
  ];

  selectedRegion: Region | undefined;

  ngOnInit() {
    this.selectedRegion = JSON.parse(localStorage.getItem('region'));
  }

  constructor(
    private userDataService: UserDataService,
    private router: Router
  ) {}

  onSearchSummoner(): void {
    localStorage.setItem('region', JSON.stringify(this.selectedRegion));
    this.userDataSub = this.userDataService
      .getUserData(this.summonerName, this.selectedRegion.code, this.tagLine)
      .subscribe(() => {
        this.router.navigate(['/profile'], {
          queryParams: {
            server: this.selectedRegion.code,
            name: this.summonerName,
            tag: this.tagLine,
          },
        });
      });
  }

  ngOnDestroy(): void {
    this.userDataSub.unsubscribe();
  }
}
