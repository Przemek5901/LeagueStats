import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { UserDataService } from '../services/user-data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { CardModule } from 'primeng/card';

interface Region {
  name: string;
  code: string;
}

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [InputTextModule, FormsModule, InputGroupAddonModule, InputGroupModule, FormsModule,DropdownModule, ButtonModule, AnimateOnScrollModule, CardModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent implements OnInit{

  summonerName:string='';
  userDataSub:Subscription ;

  regions: Region[] = [
    { name: 'Brasil', code: 'BR1' },
    { name: 'EUNE', code: 'EUN1' },
    { name: 'EUW', code: 'EUW1' },
    { name: 'Japan', code: 'JP1' },
    { name: 'Korea', code: 'KR' },
    { name: 'LAN', code: 'LA1' },
    { name: 'LAS', code: 'LA2' },
    { name: 'NA', code: 'NA1' },
    { name: 'Oceania', code: 'OC1' },
    { name: 'Philippines', code: 'PH2' },
    { name: 'Russia', code: 'RU' },
    { name: 'Singapore', code: 'SG2' },
    { name: 'Thailand', code: 'TH2' },
    { name: 'Turkey', code: 'TR1' },
    { name: 'Taiwan', code: 'TW2' },
    { name: 'Vietnam', code: 'VN2' },

  ]

  selectedRegion: Region | undefined;
  items: MenuItem[] | undefined;


  ngOnInit() {
    this.selectedRegion = JSON.parse(localStorage.getItem('region'));
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home' },
      { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
      { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
      { label: 'Documentation', icon: 'pi pi-fw pi-file' },
      { label: 'Settings', icon: 'pi pi-fw pi-cog' }
  ];

  }

  constructor(private userDataService:UserDataService,
              private router:Router
  ){}



  onSearchSummoner(){
    localStorage.setItem('region', JSON.stringify(this.selectedRegion))
    this.userDataSub = this.userDataService.getUserData(this.summonerName, this.selectedRegion.code)
    
  }
}
