import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [InputTextModule, FormsModule, InputGroupAddonModule, InputGroupModule, FormsModule,DropdownModule, ButtonModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent implements OnInit{

  summonerName:string='';

  cities: City[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ]

  selectedCity: City | undefined;
value: any;

  ngOnInit() {
  }

  onSearchSummoner(){
    
  }
}
